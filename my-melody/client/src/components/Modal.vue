<template>
  <transition v-if="component" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <span class="close" @click="$emit('hide')">&times;</span>
          <div class="modal-header">
            <h1>{{title}}</h1>
          </div>

          <div class="modal-body">
            <div name="body">
                <component @hide="$emit('hide')" :is="component"></component>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Followers from "./Followers.vue";
import Following from "./Following.vue";
import SearchDialog from './SearchDialog';
import AddPostDialog from './AddPostDialog';
import PostWrapper from './PostWrapper';
export default {
  name: "modal",
  props: {
      title: String,
      component: String
  },
  components: {
    Followers,
    Following,
    SearchDialog,
    AddPostDialog,
    PostWrapper
  }
};
</script>

<style scoped>
    .modal-mask {
        position: absolute;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .results {
        border-bottom: 2px solid black;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        max-height: 800px;
        width: 1000px;
        margin: 0px auto;
        margin-top: 80px;
        padding: 20px 30px;
        background-color: #1A2226;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        overflow: auto;
    }
    .modal-header {
        padding: 10px 0 15px;
        color: #fff;
        border-bottom: 2px solid #fff;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.15em;
        text-align: center;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-default-button {
        float: right;
    }
    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .close {
        color: #fff;
        font-size: 2em;
        float: right;
        font-weight: lighter;
        cursor: pointer;
    }
    .close:hover {
        color: #D34084;
    }
</style>
