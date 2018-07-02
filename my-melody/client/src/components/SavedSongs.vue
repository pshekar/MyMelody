<template>

  <div class="container-fluid" style="margin-top: 10px">
      <div class="filter">
      <input v-on:keyup.enter="search" class="search-box" v-model="query" placeholder="Filter"/><button class="search-btn" v-on:click="search"><icon class="searchIcon" name="search"></icon></button>
      <button v-if="query!==null" class="search-btn" v-on:click="reset">Clear</button>
    </div>
  <div class="table-row header">

    <div class="wrapper attributes top">
      <div class="wrapper title-comment-module-reporter">
        <div class="wrapper title-comment">
          <div class="column title">TITLE</div>
          <div class="column comment">ARTIST</div>
        </div>
        <div class="wrapper module-reporter">
          <div class="column module">ALBUM</div>
        </div>
      </div>
    </div>
  </div>
  <div class="line">
  </div>

  <ul>
      <li v-for="post in this.songArray" class="list">
          <div class="table-row children">

            <div class="wrapper attributes">
              <div class="wrapper title-comment-module-reporter">
                <div class="wrapper title-comment">
                  <div class="column title">{{post.track.title}}</div>
                  <div class="column comment">{{post.track.artist}}</div>
                </div>
                <div class="wrapper module-reporter">
                  <div class="column module">
                        <playable-album-art :artUrl="post.track.albumArt" :audioUrl="post.track.audio"></playable-album-art>
                   </div>
                  <div class="column reporter">{{post.username}}</div>
                </div>
              </div>
            </div>
          </div>
      </li>
  </ul>
</div>
</template>

<script>
import NavBarStandard from '../components/NavBarStandard.vue';
import axios from 'axios';
import Icon from 'vue-awesome/components/Icon';
import PlayableAlbumArt from '@/components/PlayableAlbumArt.vue'

    export default {
        name: 'SavedSongs',
        props: ['user'],
        components: {
            Icon,
            NavBarStandard,
            PlayableAlbumArt
        },
        data: function() {
            return {
                fullName: this.user.firstName + ' ' + this.user.lastName,
                query: null,
                songArray: this.$store.getters.currentUser.savedSongs
            }
        },
        methods: {
            console() {
                console.log(this.user);
            },
            filterMethod(value) {
                if (this.query.startsWith("#")) {
                    var s = value.tags;
                    for(var i = 0; i < s.length; i++) {
                        if (s[i].includes(this.query)) {
                            return value;
                        }
                    }
                    return null;
                }
                else {
                // console.log(post.track.title.toLowerCase().includes(this.query));
                // console.log(post.track.artist.toLowerCase().includes(this.query));

                    var s = value.track.title.toLowerCase().includes(this.query) || value.track.artist.toLowerCase().includes(this.query);
                    if (s) {
                        return value;
                    }
                    else {
                        return null;
                    }
                }
            },
            search() {
                console.log(this.user);
                if(this.query !== '') {
                    //var newList = this.user.savedSongs.filter(song => song.title.length > 7);
                    var newList = this.user.savedSongs.filter(song => this.filterMethod(song));
                    console.log(newList);
                    this.songArray = newList;
                }
            },
            reset() {
                this.query = null;
                this.songArray = this.user.savedSongs;
            }
        }
    }
</script>

<style scoped>
    /*
 * Define the widths: play around with these
 * to get a best fit.
 */
/*
 * Basic styles, good for a large display. Everything fits in
 * one row, no wrapping. All text based cells grow equally.
 */
 .top {
     font-size: 18pt;
     font-weight: bolder;
 }
 .line {
     width: 95%;
     height: 2px;
     background-color: #0C1012;
     margin: 0 auto;
 }
    .filter {
        text-align: right;
        margin-right: 10px;

    }

.table-row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  flex-wrap: no-wrap;
  -webkit-flex-wrap: no-wrap;
  padding: 10px 15px;
  margin: 0 auto;
}
.container-fluid {
    background-color: #1A2226;
    width: 90%;
    margin: 0 auto;
}
.children {
    text-align: left;
}
.wrapper {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  padding-left: 15px;
  -webkit-flex-direction: row;
}
.title-comment{
    width: 65%;
}
.module-reporter{
    width: 35%;
}
.column {
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-flex-grow: 0;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  vertical-align: top;
  color: #fff;
}

.module {
  width: 60%;
  padding-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.module img {
    width: 80px;
    height: 80px;
}
.reporter {
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-weight: bold;
  color: #fff;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comment {
  width: 50%;
}
.title,
.comment {
  flex-grow: 1;
  -webkit-flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 4px;
}
/* growable wrappers */
.title-comment,
.module-reporter,
.title-comment-module-reporter,
.attributes {
  flex-grow: 1;
  -webkit-flex-grow: 1;
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
    margin: 10px 0;
    background-color: #0C1012;
    color: #fff;
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
.search-btn-clear {
    border: 1px solid #d34084;
    border-radius: 20px;
    background-color: #d34084;
    color: #fff;
    height: 34px;
    padding: 0 12px;
    vertical-align: middle;
}

</style>
