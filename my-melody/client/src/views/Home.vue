<template>
  <div class="home">
    <button v-on:click="toggleModal">Add Post</button>
    <div v-for="post in posts" :key="post._id" class="post">
      <track-card :title="post.track.title" :artist="post.track.artist" :albumArt="post.track.albumArt"/>
      <p>CAPTION: {{ post.caption }}</p>
    </div>
    <transition name="fade">
      <div v-if="dialogState" class="modal">
        <button class="close" v-on:click="toggleModal">&times;</button>
        <transition name="fade" mode="out-in">
          <search-dialog v-if="dialogState === 'search'"></search-dialog>
          <add-post-dialog v-if="dialogState === 'add'"></add-post-dialog>
        </transition>
      </div>
    </transition>
 </div>
</template>

<script>
// @ is an alias to /src
import SearchDialog from '@/components/SearchDialog.vue';
import AddPostDialog from '@/components/AddPostDialog.vue';
import TrackCard from '@/components/TrackCard.vue';

export default {
  name: 'home',
  data: function () {
    return {}
  },
  computed: {
    dialogState() {
      return this.$store.getters.postModalState;
    },
    posts() {
      return this.$store.getters.posts;
    }
  },
  created: function() {
    //console.log(this.$store.getters.currentUser);
    this.$store.dispatch('getPosts', this.$store.getters);
  },
  components: {
    SearchDialog,
    AddPostDialog,
    TrackCard
  },
  methods: {
    toggleModal() {
      var state = null;
      if (!this.dialogState) {
        state = 'search';
      }
      this.$store.commit('postModalState', state);
    }
  }
}
</script>

<style scoped>
  .home {
    position: relative;
  }
  .modal {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 1200px;
    border: 1px solid #d34084;
    background-color: #fff;
    top: 50px;
  }
  .close {
    margin: 20px 20px 0 0;
    float: right;
    background: none;
    color: #d34084;
    font-size: 1.5em;
    border: none;
  }

</style>
