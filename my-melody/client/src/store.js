import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

// REMEMBER TO TURN THIS OFF
// WHEN PUSHING TO PRODUCTION
const devMode = false;

// DEFAULT TEST USER
const testUsername = "default";
const testPassword = "user";

export default new Vuex.Store({
    state: {
        spotifyToken: null,
        selectedTrack: { title: null, artist: null },
        postModalState: null,
        postModalOpen: false,
        currentUser: {},
        baseApiUrl: 'https://mymelody.herokuapp.com',
        posts: [],
        update: false,
        loggedIn: devMode
    },
    mutations: {
        selectTrack(state, track) {
            state.selectedTrack = track;
        },
        postModalState(state, dialog) {
            state.postModalState = dialog;
        },
        spotifyToken(state, token) {
            state.spotifyToken = token;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setUser(state, user) {
            state.currentUser = user;
        },
        setUpdate(state, update) {
            state.update = update;
        },
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        }
    },
    actions: {
        getUserPosts(context, username) {
            return axios.get(`${context.getters.baseApiUrl}/api/posts/${username}`, {withCredentials: true})
            .then(res => {
                context.commit('setPosts', res.data);
            })
            .catch(err => console.error(err));
        },
        getAllPosts(context, data) {
            return axios.get(`${context.getters.baseApiUrl}/api/posts/`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        getAllTags(context,data){
            return axios.get(`${context.getters.baseApiUrl}/api/tags`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        addUser(context, data) {
            return axios.post(`${context.getters.baseApiUrl}/api/auth/signup`, {
                firstName: data[0],
                lastName: data[1],
                username: data[2],
                password: data[3]
            })
            .then(res => {
                console.log(res);
                if (!res.request.response.includes('E11000')) {
                    context.commit('setUser', res.data);
                    context.commit('setLoggedIn', true);
                    return res.data;
                }
            })
            .catch(err => console.error(err));
        },
        getUser(context, data) {
            return axios.get(`${context.getters.baseApiUrl}/api/users/${data}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
        },
        loginUser(context, data) {
            var uname = devMode ? testUsername : data[0];
            var pword = devMode ? testPassword : data[1];
            return axios.post(`${context.getters.baseApiUrl}/api/auth/login`,
                {
                    username: uname,
                    password: pword,
                })
                .then(res => {
                    context.commit('setUser', res.data);
                    context.commit('setLoggedIn', true);
                    return res.data;
                })
                .catch(err => console.error(err));
        },
        editUser(context, data) {
            return axios.put(`${context.getters.baseApiUrl}/api/users/${data.username}`, data)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        resetUser(context, user) {
            context.commit('setLoggedIn', true);
            context.commit('setUser', user)
        },
        editTag(context, data) {
            var encoded = data;
            if (data.substring(0, 1) !== '%') {
                encoded = encodeURIComponent(data);
            }
            return axios.put(`${context.getters.baseApiUrl}/api/tags/${encoded}`,
            {
                posts: data.posts
            })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
        },
        logout(context, username) {
            context.commit('setLoggedIn', false);
        },
        editFollowers(context, data) {
            return axios.put(`${context.getters.baseApiUrl}/api/users/${data.username}`,
                {
                    following: data.following,
                    followers: data.followers
                })
                .then(res => {
                    return res.data;
                })
                .catch(err => console.error(err));
        },
        searchUsers(context, data) {
            var encoded = data;
            if (data.substring(0, 1) !== '%') {
                encoded = encodeURIComponent(data);
            }
            return axios.get(`${context.getters.baseApiUrl}/api/users/search/${encoded}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        searchTags(context, data) {
            var encoded = data;
            if (data.substring(0, 1) !== '%') {
                encoded = encodeURIComponent(data);
            }
            return axios.get(`${context.getters.baseApiUrl}/api/tags/search/${encoded}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        saveSong(context, data) {
            return axios.put(`${context.getters.baseApiUrl}/api/users/${data.username}`,
            {
                savedSongs: data.savedSongs
            })
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
        },
        getTag(context, data) {
            var encoded = data;
            if (data.substring(0, 1) !== '%') {
                encoded = encodeURIComponent(data);
            }
            return axios.get(`${context.getters.baseApiUrl}/api/tags/${encoded}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
        },
        isLoggedIn(context, data) {
            return axios.get(`${context.getters.baseApiUrl}/api/auth/loggedIn`)
            .then(res => {
                if (res.data.user) {
                    context.commit('setUser', res.data.user)
                }
                return res.data;
            })
            .catch(err => console.log(err));
        },
        logoutUser(context, data) {
            return axios.get(`${context.getters.baseApiUrl}/api/auth/logout`)
            .then(res => {
                if (res.data.message) {
                    context.commit('setLoggedIn', false);
                    context.commit('setUser', {})
                    return res.data
                }
            })
            .catch(err => console.log(err));
        },
        addTag(context, data) {
            return axios.post(`${context.getters.baseApiUrl}/api/tags/`,
            {
                tag: data.tag,
                posts: data.posts,
            })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
        }
    },
    getters: {
        selectedTrack(state) {
            return state.selectedTrack;
        },
        postModalState(state) {
            return state.postModalState;
        },
        spotifyToken(state) {
            return state.spotifyToken;
        },
        currentUser(state) {
            return state.currentUser;
        },
        posts(state) {
            return state.posts;
        },
        baseApiUrl(state) {
            return state.baseApiUrl;
        },
        update(state) {
            return state.update;
        },
        loggedIn(state) {
            return state.loggedIn;
        }
    }
});
