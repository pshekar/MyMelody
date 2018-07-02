<template>
    <div class="landingPageContainer">
        <header>
            <header class="navLogo">{{ landingMessage.projectNameMessage }}</header>
            <h1 class="headline">{{ landingMessage.headlineMessage }}</h1>
            <h2 class="subhead">{{ landingMessage.subheadMessage }}</h2>
        </header>

        <div class="auth">
            <button class="signup" v-on:click="register">{{ landingMessage.signupMessage }}</button>
            <div class="divider">
                <hr/>
                <p class="alreadyHaveAccount">{{ landingMessage.alreadyHaveAccountMessage }}</p>
                <hr/>
            </div>
            <button class="login" v-on:click="login">{{ landingMessage.loginMessage }}</button>
        </div>
        <img class="background" src="../assets/RedMusicClean.jpg"/>
    </div>
</template>

<script>
    import landingMessages from '../messages/LandingMessages.json';

    export default {
        name: 'landingPage',
        data: function() {
            return {
                landingMessage: landingMessages
            }
        },
        methods: {
          login() {
            this.$router.push('login');
          },
          register() {
            this.$router.push('register');
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


    hr {
        margin: 60px 0;
        width: 75px;
        color: #FFFFFF;
    }

    button {
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
    }

    button:focus {
        outline: none;
    }

    .landingPageContainer {
        margin-left: 250px;
        width: 400px;
    }

    .navLogo {
        color: #D34084;
        font-size: 60px;
        font-weight: 600;
        margin-top: 60px;
    }

    .headline {
        color: #FFFFFF;
        font-size: 35px;
        margin-top: 120px;
    }

    .subhead {
        color: #FFFFFF;
        font-size: 28px;
        margin-top: 50px;
    }

    .auth {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 50px;
        width: 400px;
    }

    .signup {
        color: #FFFFFF;
        background-color: #D34084;
    }

    .login {
        color: #D34084;
    }

    .divider {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 600px;
        color: #FFFFFF;
    }

    .alreadyHaveAccount {
        margin: 0 30px;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
    }

    @media (max-width: 1400px) {
        .background {
            height: 100%;
            width: 1400px;
        }
    }

    @media (max-width: 900px) {
        .landingPageContainer {
            margin: 0 auto;
        }
    }

</style>
