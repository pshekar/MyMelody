<template>
        <div class="container">
            <track-card :title="track.title" :artist="track.artist" :albumArt="track.albumArt"/>
            <div class="caption">
                <textarea v-model="caption" placeholder="Add a caption..."></textarea>
                <input v-model="tags" class="tags" placeholder="Add tags separated by spaces..."></input>
                <div>
                    <button v-on:click="back">Back</button>
                    <button v-on:click="addPost">Add Post</button>
                </div>
            </div>
        </div>
</template>

<script>
import TrackCard from './TrackCard.vue';
import Icon from 'vue-awesome/components/Icon';
import PostWall from './PostWall.vue';
import Vue from 'vue';

import axios from 'axios';

export default {
    name: 'add-post-dialog',
    data: function() {
        return {
            caption: null,
            tags: '',
            tagArray: [],
            uniqueArray: [],
            post: null,
        }
    },
    computed: {
        track() {
            return this.$store.getters.selectedTrack;
        }
    },
    methods: {
        tagStuff(tag) {
            this.$store.dispatch('getTag', tag)
            .then(res2 => {
                if (res2 === null) {
                    var newArray = [];
                    newArray.push(this.post);
                    this.$store.dispatch('addTag', {tag: tag, posts: newArray})
                    .then(res3 => {})
                    .catch(err => console.error(err));
                }
                else {
                    var newPosts = res2.posts.concat(this.post);
                    this.$store.dispatch('editTag', {tag: res2.tag, posts: newPosts})
                    .then(res3 => {})
                    .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));
        },
        addPost() {
            // console.log({track: this.$store.getters.selectedTrack, caption: this.caption})
            this.tagArray = this.tags.split(" ");
            for (var tag in this.tagArray) {
                if (this.tagArray[tag].substring(0, 1) !== '#') {
                    this.tagArray[tag] = '#' + this.tagArray[tag];
                }
            }
            this.uniqueArray = this.tagArray.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            axios.post(`${this.$store.getters.baseApiUrl}/api/posts/`, {
                username: this.$store.getters.currentUser.username,
                caption: this.caption,
                track: this.track,
                tags: this.uniqueArray,
            }).then(res => {
                this.post = res.data;
                for (var i = this.uniqueArray.length-1; i >= 0; i--) {
                    this.tagStuff(this.uniqueArray[i]);
                }

                this.$store.commit('postModalState', null);
                this.$emit('hide');

                var newPostArray = this.$store.getters.posts;
                // console.log("res data", res.data);
                var newPost = res.data;
                newPost.track = this.track;
                newPostArray.unshift(res.data);
                this.$store.commit('setPosts', newPostArray);

            }).catch(err => console.error(err));
        },
        back() {
            this.$store.commit('postModalState', 'search');
        },
    },
    components: {
        TrackCard,
        Icon,
        PostWall
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        padding: 30px;
        max-width: 700px;
        margin: 0 auto;
    }

    .caption {
        margin-left: 15px;
    }

    .caption textarea {
        width: 300px;
        height: 150px;
        resize: none;
    }

    .tags {
        height: 50px;
        width: 300px;
        resize: none;
    }

    .caption button {
        box-sizing: border-box;
        width: 150px;
        padding: 7px 0;
        border: 1px solid #d34084;
        border-radius: 25px;
        background-color: #d34084;
        color: #fff;
        margin: 5px 1px;
    }
</style>
