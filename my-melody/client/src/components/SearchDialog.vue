<template>
    <div class="container">
        <input class="search-box"  v-on:keyup.enter="search" v-model="query" placeholder="Search"/><button class="search-btn" v-on:click="search"><icon class="searchIcon" name="search"></icon></button>
        <div class="results">
            <p class="text" v-if="!tracks">Search for a song or artist.</p>
            <div v-if="noResults" class="noresults">
                <p>No results found.</p>
            </div>
            <transition-group name="fade" class="transition">
                <div v-for="track in tracks" :key="track.trackId" class="result">
                    <track-card :title="track.title" :artist="track.artist" :albumArt="track.albumArt"/>
                    <button class="select" v-on:click="select(track)">Select</button>
                </div>
            </transition-group>
        </div>
        <button v-if="this.selectedTrack === null" class="continueOne">Continue</button>
        <button v-else class="continue" v-on:click="commit" :disabled="!selectedTrack">Continue</button>
    </div>
</template>

<script>
import TrackCard from './TrackCard.vue';
import axios from 'axios';
import Icon from 'vue-awesome/components/Icon';

export default {
    name: 'search-dialog',
    components: {
        TrackCard,
        Icon
    },
    data: function() {
        return {
            query: null,
            noResults: false,
            tracks: null,
            selectedTrack: null
        }
    },
    methods: {
        search() {
            this.selectedTrack = null;
            axios.get(`${this.$store.getters.baseApiUrl}/api/spotify/search?q=${this.query}`)
                .then(res => {
                    if (res.data.length < 1) {
                        this.noResults = true;
                    }
                    this.tracks = res.data
                })
                .catch(err =>  console.error(err));
        },
        select(track) {
            this.selectedTrack = track;
        },
        commit() {
            this.$store.commit('selectTrack', this.selectedTrack);
            this.$store.commit('postModalState', 'add');
        }
    }
}
</script>

<style scoped>
    .container {
        width: 1000px;
        margin: 30px auto;
    }
    .search-box {
        border: 2px solid #d34084;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0 15px;
        height: 30px;
        margin: 10px 0;
    }
    .text {
        color: white;
    }
   .search-btn {
       border: 1px solid #d34084;
       border-top-right-radius: 20px;
       border-bottom-right-radius: 20px;
       background-color: #d34084;
       color: #fff;
       height: 34px;
       padding: 0 12px;
       vertical-align: middle;
    }
    .search-btn:hover {
        cursor: pointer;
    }
    .results {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 400px;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .transition {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .results::-webkit-scrollbar {
        width: 10px;
    }

    .results::-webkit-scrollbar-track {
        background: #ddd;
    }

    .results::-webkit-scrollbar-thumb {
        background: #d34084;
    }

    .result {
        color: #fff;
        margin: 15px;
    }

    .searchIcon svg {
        color: #fff;
    }
    .select {
        padding: 8px 30px;
        border: 1px solid #d34084;
        border-radius: 25px;
        background-color: #d34084;
        color: #fff;
        float: right;
    }
    .select:hover{
        cursor: pointer;
    }
    .continue {
        padding: 10px 30px;
        margin: 10px 0;
        border: 1px solid #d34084;
        border-radius: 25px;
        background-color: #d34084;
        color: #fff;
        float: right;
    }
    .continueOne {
        padding: 10px 30px;
        margin: 10px 0;
        border: 1px solid #d34084;
        border-radius: 25px;
        background-color: #fff;
        color: #d34084;
        float: right;
    }
    .continue:hover {
        cursor: pointer;
    }
</style>
