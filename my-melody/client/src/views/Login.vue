<template>
    <div>
        <navBarLogin/>
        <div id="full">
            <!-- <div class="projectNameContainer">
                <header class="projectName">{{ loginMessage.projectName }}</header>
            </div> -->
            <div class="loginForm">
                  <div>
                      <input type="text" v-model="message" :placeholder="loginMessage.usernameField" autofocus/>
                  </div>
                  <div>
                      <input type="password" v-model="password" :placeholder="loginMessage.passwordField"/>
                  </div>
                  <div>
                      <button v-on:click="login" class="loginButton">{{ loginMessage.login }}</button>
                      <!-- <router-link to="/home">Login</router-link> -->
                  </div>
            </div>
        </div>
        <div class="background">
        </div>
    </div>
</template>

<script>
import navBarLogin from '../components/NavBarLogin.vue';
import loginMessage from '../messages/LoginMessages.json';

export default {
    name: 'login',
    components: {
        navBarLogin
    },
    data: function () {
      return {
        message: '',
        password: '',
        loginMessage: loginMessage
      }
    },
    methods: {
      login() {
        if (this.$data.message === '' || this.$data.password === '') {
          alert('Fields should not be empty!');
          return;
        }
        else {
          this.$store.dispatch('loginUser', [this.$data.message, this.$data.password])
          .then(res => {
              if (res.message) {
                if (res.message.includes('Invalid')) {
                    alert('Incorrect username/password combination');
                }
                else if (res.message.includes('found')) {
                    alert('Username does not exist!');
                }
              }
              else {
                  this.$router.push({
                      name: 'profile'
                  });
              }
          });
        }
      },
      facebook() {
        console.log('this is username: ' + this.$data.message + ', this is password: ' + this.$data.password);
      }
  },
  created: function() {
      this.$store.dispatch('isLoggedIn')
      .then(res => {
          if (res.loggedIn) {
              this.$store.dispatch('resetUser', res.user)
              .then(res => {
                  this.$router.push({
                      name: 'profile'
                  });
              })
          }
      })
  }
}
</script>

<style scoped>
    input {
        width: 340px;
        margin-top: 50px;
        padding: 30px 30px 10px 30px;
        background: none;
        font-size: 24px;
        border: none;
        border-bottom: 4px solid #D34084;
        color: #FFFFFF;
    }

    input:focus {
        outline: none;
    }

    .fill {
        display: flex;
        width: 400px;
        margin: 0 auto;
    }

    .projectName {
        font-size: 60px;
        font-weight: 600;
        color: #D34084;
        margin-top: 50px;
    }

    .loginForm {
        margin-top: 50px;
    }

    .loginButton {
        margin-top: 100px;
        box-sizing: border-box;
        width: 400px;
        padding: 20px 0;
        border: none;
        font-size: 17px;
        font-weight: 700;
        border-radius: 5px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        background: #D34084;
        color: #FFFFFF;
    }

    .background {
        position: absolute;
        top: 0;
        right: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #0C1012;
    }

    #full {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
