var express = require('express');
var axios = require('axios');

var router = express.Router();

var TOKEN = null;

function refreshToken() {
    return axios.post(
        'https://accounts.spotify.com/api/token', 
        "grant_type=client_credentials", 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${process.env.CLIENT_AUTH}`,
            }
        } 
    ).then(res => TOKEN = res.data.access_token);
}

router.route('/search')
    .get((req, res) => {
        function search(token) {
            axios.get(`https://api.spotify.com/v1/search?q=${req.query.q}&type=track`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(result => {
                var tracks = result.data.tracks.items;
                tracks = tracks.map(item => {
                    return {
                        service: 'spotify',
                        title: item.name,
                        artist: item.artists.map(artist => {
                                    return artist.name
                                }).join(', '),
                        albumArt: item.album.images ? item.album.images[0].url : null,
                        trackId: item.id,
                        audio: item.preview_url
                    }
                });
                res.jsonp(tracks);
            })
            .catch(err => { 
                if (err.response.status === 401) {
                    refreshToken()
                        .then(tok => search(tok))
                        .catch(err => console.error(err));        
                }
            });
        }
        search(TOKEN);
    })

module.exports = router;