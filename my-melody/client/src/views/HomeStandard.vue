<template>
    <div class="home">
        <div class="nav">
            <NavBarStandard />
        </div>
        <div v-if="this.posts.length === 0" class="whiteText">
            Loading...
        </div>
        <div v-else>
            <div class="filterWrap">
                <input class="search-box" v-on:keyup.enter="search" v-model="query" placeholder="Filter by artist, track, or tag"/><button class="search-btn" v-on:click="search"><icon class="searchIcon" name="search"></icon></button>
            </div>
            <div v-if="this.posts.includes('nothing')" class="whiteText">
                No posts were found.
            </div>
            <div v-else>

                <ul>
                    <li v-for="post in this.posts" class="results">
                        <div class="card">
                            <div class="topInfo">
                                <div class="userInfo">
                                <p @click="navigate(post.username)">{{post.username}}</p>
                                </div>
                                <div class="saveIcon">
                                    <button class="saveButton" v-on:click="saveSong(post)">
                                        <icon class="plus" name="plus"></icon>
                                    </button>
                                </div>
                            </div>
                            <div class="image">
                                <playable-album-art :artUrl="post.track.albumArt" :audioUrl="post.track.audio"></playable-album-art>
                            </div>
                            <div class="bottomInfo">
                                <div class="songInfo">
                                    {{post.track.title}} - {{post.track.artist}}
                                </div>
                                <div class="timestamp">
                                    {{formattedDate(post.posted)}}
                                </div>
                                <div v-if="post.tags.length > 0" class="tags">
                                    <li v-for="tags in post.tags">
                                        <div @click="navigateTag(tags)">{{tags}}</div>
                                    </li>

                                </div>
                                <div class="songDesc">
                                    {{post.caption}}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="background">
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavBarStandard from '@/components/NavBarStandard.vue'
import Icon from 'vue-awesome/components/Icon'
import dateFormat from 'dateformat'
import PlayableAlbumArt from '@/components/PlayableAlbumArt.vue'

export default {
    name: 'home',
    data: function () {
        return {
            posts: [],
            allPosts: [],
            query: null,
        }
    },
    computed: {

    },
    created: function() {
        this.$store.dispatch('isLoggedIn')
        .then(res => {
            if (res.loggedIn && !this.$store.getters.currentUser.following) {
                this.$store.dispatch('resetUser', res.user)
                .then(res => {
                    this.$router.push({
                        name: 'profile'
                    });
                })
            }
        })

        var allFollowerPosts = [];

        this.$store.dispatch('getAllTags')
        .then(res => {
            res.filter(tag => {
                if
                    (this.$store.getters.currentUser.following.includes(tag.tag)) {
                        allFollowerPosts.push(...tag.posts);
                    };
            });
        }).then(
        this.$store.dispatch('getAllPosts')
        .then(res => {

            res.filter(post => {
                if
     (this.$store.getters.currentUser.following.includes(post.username) || post.username === this.$store.getters.currentUser.username)  {
                    allFollowerPosts.push(post);
                };
            });

            this.posts = allFollowerPosts; //filter by time here
            if (this.posts.length === 0) {
                this.posts = ['nothing'];
            }
            else {
                var date_sort_desc = function (post1, post2) {
                  if (post1.posted > post2.posted) return -1;
                    if (post1.posted < post2.posted) return 1;
                    return 0;
                };
                this.posts.sort(date_sort_desc);
            }
            this.allPosts = this.posts;
        }));

    },
    components: {
        NavBarStandard,
        Icon,
        PlayableAlbumArt
    },
    methods: {
        saveSong(post) {
            console.log(post);
            this.$store.getters.currentUser.savedSongs.push(post);
            this.$store.dispatch('saveSong', this.$store.getters.currentUser);
            alert('Song Saved!');
        },
        navigate(username) {
            this.$router.push({
                path: `/user/${username}`
            });
        },
        navigateTag(tags) {
            var tagger = '%23' + tags.substring(1);
            this.$router.push({
               path: `/tag/${tagger}`
            });
        },
        formattedDate(date) {
            return dateFormat(new Date(date), 'mmmm dS, yyyy');
        },
        filterMethod(post) {
            if (this.query.startsWith("#")) {
                var s = post.tags;
                for(var i = 0; i < s.length; i++) {
                    console.log(s[i]);
                    if(s[i].includes(this.query)) {
                        return post;
                    }
                }
                return null;
            }
            else {
                // console.log(post.track.title.toLowerCase().includes(this.query));
                // console.log(post.track.artist.toLowerCase().includes(this.query));

                var s = post.track.title.toLowerCase().includes(this.query) || post.track.artist.toLowerCase().includes(this.query);
                if (s) {
                    return post;
                }
                else {
                    return null;
                }
            }
        },
        search() {
            if(this.query !== null && this.query !== '') {
                //var newList = this.user.savedSongs.filter(song => song.title.length > 7);

                var tempAllPosts = this.allPosts;
                var newList = tempAllPosts.filter(posts => this.filterMethod(posts));
                if (newList.length === 0) {
                    newList = ['nothing'];
                }
                this.posts = newList;
            }
            else {
                this.posts = this.allPosts;
            }
        }

    }
}
</script>

<style scoped>
.filterWrap {
    margin: 10px;
    float: right;
}
.searchIcon svg {
    color: #fff;
}
.search-box {
    border: 2px solid #d34084;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 0 15px;
    height: 30px;
    width: 150px;
    margin: 10px 0;
    background-color: #0C1012;
    color: #FFFFFF;
}
.search-btn {
    border: 1px solid #d34084;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #d34084;
    color: #fff;
    height: 34px;
    padding: 0 12px;
    margin-top: -2px;
    cursor: pointer;
    vertical-align: middle;
}
.whiteText {
    color: #FFFFFF;
}

.nav {
    height: 80px;
    position: fixed;
    width: 100%;
    top: 0;
}
.card {
    display: flex;
    flex-direction: column;
    width: 550px;
    height:750px;
    background-color: #1A2226;
    color: #fff;
    margin: 25px 0px;
}
.home {
    background: #0C1012;
    margin-top: 95px;
    height: 100%;
    display: flex;
    justify-content: center;
}
.topInfo {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: stretch;
}
.bottomInfo {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

    .tags{
    margin: 10px 0 10px 20px;
    }
.songInfo {
    font-size: 16pt;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 20px;
}
.songDesc {
    margin-bottom: 35px;
    margin-left: 20px;
    margin-top: 20px;
}
.timestamp {
    margin: 10px 0 10px 20px;
    font-style: italic;
}
.userInfo {
    margin-left: 20px;
    font-size: 13pt;
}
.saveButton {
    cursor: pointer;
}
.plus:hover {
    color: #D34084;
}
.saveIcon {
    margin-left: auto;
    padding-right: 20px;
    display: flex;
    align-items: center;
}
.saveIcon button {
    background: #1A2226;
    border: none;
}
.saveIcon svg {
    width: 20px;
    height: 20px;
    color: white;
}
.image img {
    width: 550px;
    height: 550px;
}
.background {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: #0C1012;
}

.userInfo {
    cursor: pointer;
}

.userInfo p:hover {
    color: #D34084;
}
.tags {
    display: flex;
}
.tags li {
    margin-right: 10px;
}
.tags li:hover {
    color: #D34084;
    cursor: pointer;
}

</style>
