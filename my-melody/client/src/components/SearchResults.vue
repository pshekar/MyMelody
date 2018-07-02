<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <slot name="body">
                  <ul>
                      <li v-for="user in users" v-on:click="changeUser(user.username)" class="results">
                          <div v-if="user.username !== currentUser.username">
                              {{user.username}}
                          </div>
                      </li>
                  </ul>
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="$emit('exit', true)">
                    Cancel
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'search-results',
    props: ['users'],
    methods: {
        changeUser(username) {
            this.$store.dispatch('getUser', username)
            .then(res => {
                this.$emit('exit', true);
                this.$router.push({
                    name: `otherprofile`,
                    params: {
                        username: res.username,
                        user: res
                    }
                });
            })
            .catch(err => console.log(err));
        }
    },
    data: function () {
        return {

        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        }
    }
}
</script>

<style scoped>
    modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    }
    .search-box {
        border: 2px solid #d34084;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0 15px;
        height: 30px;
        margin: 10px 0;
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

    .results {
        border-bottom: 2px solid black;
    }

    .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    }

    .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
    margin-top: 0;
    color: #42b983;
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
</style>
