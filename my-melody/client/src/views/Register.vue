<template>
    <div class="register">
        <navBarLogin />
        <div class="signupForm">
            <div>
                <input type="text" v-model="fName" placeholder="First name" autofocus> </input>
            </div>
            <div>
                <input type="text" v-model="lName" placeholder="Last name"> </input>
            </div>
            <div>
                <input type="text" v-model="username" placeholder="Username"> </input>
            </div>
            <div>
                <input type="password" v-model="password" placeholder="Password"></input>
            </div>
            <div>
                <input type="password" v-model="password2" placeholder="Confirm password"></input>
            </div>

            <button v-on:click="register" class="registerButton">Register</button>
        </div>
        <div class="background">
        </div>

    </div>
</template>

<script>
    import navBarLogin from '../components/NavBarLogin.vue'

    export default {
        name: 'register',
        components: {
            navBarLogin
        },
        data: function () {
          return {
            fName: '',
            lName: '',
            username: '',
            password: '',
            password2: '',
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
        },
        methods: {
          register() {
            if (this.$data.password !== this.$data.password2) {
              alert('Passwords do not match!');
            }
            else if (this.$data.fName === '' || this.$data.lName === '' || this.$data.username === '' || this.$data.password === '' || this.$data.password2 === '') {
              alert('Fields cannot be empty!');
            }
            else {
              this.$store.dispatch('addUser', [this.$data.fName, this.$data.lName, this.$data.username, this.$data.password])
              .then(res => {
                  console.log(res);
                  if (res.message) {
                    if (res.message.includes('exists')) {
                        alert('User already exists!');
                    }
                  }
                  else {
                      alert('User created!');
                      this.$router.push({
                          name: 'profile'
                      });
                  }
                  // var user = {
                  //   firstName: this.$data.fName,
                  //   lastName: this.$data.lName,
                  // }
                  // if (this.$store.getters.loggedIn) {
                  //   alert('User created!');
                  //   this.$router.push({
                  //       name: 'profile',
                  //       params: {
                  //         user: user,
                  //       }
                  //   });
                  // }
                  // else {
                  //   alert('Username already exists!');
                  // }
              })
              .catch(err => {
                  console.log(err);
              })
            }
          }
        }
    }
</script>

<style scoped>

    input {
        width: 340px;
        margin-top: 20px;
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
    .signupForm {
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
    }

    .registerButton {
        margin-top: 50px;
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
</style>
