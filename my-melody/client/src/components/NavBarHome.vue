<template>
  <div class="around">
        <h1 class="nav">{{ homeMessage.projectName }}</h1>
        <!-- <router-link to="/about">About</router-link>
        <router-link to="/team">Team</router-link> -->
        <input type="text" placeholder="Search"/>
        <router-link to="login" class="pictures right">
            <img src="../assets/logout.png"/>
        </router-link>
        <router-link to="login" class="pictures middle">
            <img v-on:click="logout" src="../assets/Profile.png"/>
        </router-link>
        <router-link to="login" class="pictures left">
            <img src="../assets/upload.png"/>
        </router-link>


  </div>
</template>

<script>
import homeMessages from '../messages/HomeMessages.json'

export default {
    name: 'NavBarHome',
    data: function() {
        return {
            homeMessage: homeMessages
        }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout', null);
      }
    }
}
</script>

<style scoped>
    .right {
      padding-right: 15px;
    }
    .middle {
      padding-right: 60px;
    }
    .left {
      padding-right: 105px;
    }
    .pictures {
      position: absolute;
      background: none;
      right: 0;
      border: none;
      height: 80px;
      margin: 0 10px;
      text-align: center;
      padding-top: 15px;
    }
    .pictures > img {
      height: 40px;
      width: 34px;
    }
    .around {
      background-color: #1A2226;
      height: 80px;
      width: 100%;
      position: relative;
      vertical-align: middle;
      line-height: 80px;
      text-align: center;
    }
    .around h1 {
      position: absolute;
    }
    .around input[type=text] {
        border: none;
        position: relative;
        font-weight: 700;
        font-size: 18px;
        color: #1A2226;
        width: 30%;
        height: 40%;
        border-radius: 7px;
        vertical-align: middle;
    }
    .nav {
        flex-grow: 3;
        width: auto;
        color: #D34084;
        display: flex;
        background-color: #1A2226;
    }

    button:focus {
      outline: none;
    }
    input {
      text-align: center;
      background-color: #EBDBE2;
    }
    input::placeholder {
      color: #1A2226;
    }
    input:focus {
      outline: none;
    }
    h1 {
        font-weight: 600;
        font-size: 40px;
        align-content: center;
        letter-spacing: 2px;
        padding-left: 5%;
    }
</style>
