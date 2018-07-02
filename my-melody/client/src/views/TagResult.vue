<template>
  <div class="profileContainer">
    <div class="nav">
      <NavBarStandard />
    </div>
    <div class="topTitle">
        <div>
            {{this.$route.params.tag}}
        </div>
        <div>
            <button v-if="!currentUser.following.includes(this.$route.params.tag)" class="followRouterLink" @click="follow">Follow</button>
            <button v-else class="followRouterLink" @click="unfollow">Unfollow</button>
        </div>
    </div>
    <div class="home">
        <ul>
            <li v-for="post in this.tag.posts" class="results">
                <div class="card">
                    <div class="topInfo">
                        <div class="userInfo">
                        <p @click="navigate(post.username)">{{post.username}}</p>
                        </div>
                        <div class="saveIcon">
                            <button class="saveButton" v-on:click="saveSong(post.track)">
                                <icon class="plus" name="plus"></icon>
                            </button>
                        </div>
                    </div>
                    <div class="image">
                        <img v-bind:src="post.track.albumArt">
                    </div>
                    <div class="bottomInfo">
                        <div class="songInfo">
                            {{post.track.title}} - {{post.track.artist}}
                        </div>
                        <div class="timestamp">
                            {{formattedDate(post.posted)}}
                        </div>
                        <div class="songDesc">
                            {{post.caption}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>

    <div class="background">
    </div>
  </div>
</template>

<script>
import PostWall from '../components/PostWall.vue'
import NavBarStandard from '../components/NavBarStandard.vue'
import SavedSongs from '../components/SavedSongs.vue'
import dateFormat from 'dateformat'

import homeMessages from '../messages/HomeMessages.json'
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'tagresult',
    components: {
        Icon,
        NavBarStandard,
        PostWall,
        SavedSongs
    },
    watch: {
        '$route': function (to, from) {
            if (!from.path.includes('%23')) {
                this.$store.dispatch('getUser', to.params.username);
            }
            else {
                var percent = '%23' + to.params.tag.substring(1);
                this.$store.dispatch('getTag', percent).then(t => this.tag = t);
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
    },
    mounted: function() {

        var percent = '%23' + this.$route.params.tag.substring(1);
        this.$store.dispatch('getTag', percent).then(t => this.tag = t);
    },
    data: function() {
      return {
          homeMessage: homeMessages,
          tag: null
      }
    },
    methods: {
        formattedDate(date) {
            return dateFormat(new Date(date), 'mmmm dS, yyyy');
        },
        saveSong(track) {
            this.$store.getters.currentUser.savedSongs.push(track);
            this.$store.dispatch('saveSong', this.$store.getters.currentUser);
            alert('Song Saved!');
        },
        follow() {
            this.$store.getters.currentUser.following.push(this.$route.params.tag);
            this.$store.dispatch("editFollowers", this.$store.getters.currentUser);
        },
        unfollow() {
            var index = this.$store.getters.currentUser.following.indexOf(this.$route.params.tag);
            if (index > -1) {
                this.$store.getters.currentUser.following.splice(index,1);
            }
            this.$store.dispatch("editFollowers", this.$store.getters.currentUser);
        }
    }
}
</script>

<style scoped>
  #startActive {

  }
  .savedSongs {
      margin: 0 auto;
  }
  .followRouterLink {
      margin-top: 16px;
      background-color: #D34084;
      border: 1px solid #D34084;
      border-radius: 5px;
      color: #FFFFFF;
      padding: 3px 0;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
  }
  .topTitle {
      color: #fff;
      font-size: 32pt;
      font-weight: bold;
      display: flex;
      align-items: center;
      flex-direction: column;
  }
  .profileContainer {
      background: #0C1012;
      margin-top: 95px;
  }
  .home {
      background: #0C1012;
      margin-top: 10px;
      height: 100%;
      display: flex;
      justify-content: center;
  }
  .card {
      display: flex;
      flex-direction: column;
      width: 550px;
      height:700px;
      background-color: #1A2226;
      color: #fff;
      margin: 25px 0px;
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
  .songInfo {
      font-size: 16pt;
      font-weight: bold;
      margin-top: 10px;
      margin-left: 20px;
  }
  .songDesc {
      margin-bottom: 35px;
      margin-left: 20px;
  }
  .timestamp {
      margin: 10px 0 10px 20px;
      font-style: italic;
  }
  .userInfo {
      margin-left: 20px;
      font-size: 13pt;
  }
  .image img {
      width: 550px;
      height: 550px;
  }
  .nav {
    height: 80px;
    position: fixed;
    width: 100%;
    top: 0;
  }
  .personalInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-end;
    padding-bottom: 15px;
    margin-top: 140px;
  }
  .profilePicture {
      width: 150px;
      height: 150px;
      border: 2px solid #D34084;
      border-radius: 200px;
      color: #D34084;
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
  .description {
      font-size: 20px;
      margin-top: 30px;
  }
  .followerCount {
      font-size: 20px;
      margin-top: 30px;
  }
  .followRouterLink {
      margin-top: 16px;
      background-color: #D34084;
      border: 1px solid #D34084;
      border-radius: 5px;
      color: #FFFFFF;
      padding: 3px 0;
      font-size: 18px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      height: 45px;
      width: 95px;
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
  .button {
    background-color: #0C1012;
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-bottom: 2px solid black;
  }
  .button:hover {
    background-color: #D34084;
    color: white;
    outline: none;
  }
  .button:focus {
    background-color: #D34084;
    outline: none;
    color: white;
  }
  img {
    width: 250px;
    height: 250px;
    padding-right: 40px;
  }
  header {
    font-size: 32pt;
    font-weight: bold;
    color: #D34084;
  }

</style>
