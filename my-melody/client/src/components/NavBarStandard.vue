<template>
    <div class="navBarStandardContainer">
        <modal :title="dialog" :component="dialog" @hide="dialog = null"></modal>
        <header class="projectName">{{ homeMessage.projectName }}</header>

        <div class="searchBarContainer">
            <input v-model="searchText" v-on:keyup.enter="search" class="searchBar" type="text" placeholder="Search" />
            <div v-if="toggleModal === true">
                <SearchResultProfile v-on:exit="reset" v-bind:users="this.users"/>
            </div>
        </div>
        <!-- <div v-if="toggleModal" @close="toggleModal = false" class="modal">
            <SearchResults @exit="toggleModal = false" v-bind:users="this.users"/>
        </div> -->
        <div class="iconMenuContainer">
            <router-link class="iconMenu" to="/home">
                <icon class="icons" name="home"></icon>
            </router-link>
            <router-link class="iconMenu" :to="{name: 'profile', params: {user: this.$store.getters.currentUser}}">
                <icon class="icons" name="user"></icon>
            </router-link>
            <div class="iconMenu" @click="dialog = 'post-wrapper'">
                <icon class="icons" name="clone"></icon>
            </div>
            <div class="iconMenu" @click="logout">
                <icon class="icons" name="sign-out"></icon>
            </div>
        </div>

        <div class="iconMenuMiniContainer">
            <icon class="icons" name="bars"></icon>
        </div>
    </div>
</template>

<script>
import homeMessages from '../messages/HomeMessages.json'
import SearchResults from  './SearchResults.vue'
import SearchResultProfile from './SearchResultProfiles.vue'
import Modal from './Modal.vue'

import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'NavBarStandard',
    components: {
        Icon,
        SearchResults,
        SearchResultProfile,
        Modal
    },
    data: function() {
        return {
            homeMessage: homeMessages,
            searchText: '',
            users: [],
            results: [],
            toggleModal: false,
            dialog: null
        }
    },
    methods: {
        populateUsers() {
            for (var user in users) {
                console.log(user.username);
            }
        },
        search() {
            // console.log(this.searchText.length);
            this.users = [];
            if (this.searchText.length > 0) {
                this.$store.dispatch('searchUsers', this.searchText)
                    .then(res => {
                        this.users.push(...res);
                    })
                    .then(
                        this.$store.dispatch('searchTags', this.searchText)
                            .then(res => {
                                this.users.push(...res);
                            })
                    )
            }
            else {
                this.users = [];
            }
            this.toggleModal = true;
        },
        reset() {
            this.searchText = '';
            this.users = [];
            this.toggleModal = false;
        },
        logout() {
            this.$store.dispatch('logoutUser')
            .then(res => {
                this.$router.push({
                    name: 'landingPage'
                });
            })
        }
    }
}
</script>

<style scoped>
    .navBarStandardContainer {
        background: #1A2226;
        height: 80px;
        width: 100%;
        display: flex;
        line-height: 80px;
        justify-content: space-between;
    }

    .projectName {
        color: #D34084;
        font-size: 40px;
        font-weight: 600;
        align-content: center;
        /* flex-basis: 100px; */
        margin-left: 30px;
        margin-right: 10px;
        flex-grow: 3;
    }

    .searchBarContainer {
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-grow: 8;
    }

    .searchBar {
        height: 40px;
        width: 350px;
        padding-left: 20px;
        padding-right: 20px;
        background: #0C1012;
        color: #FFFFFF;
        border: 1px solid #D34084;
        border-radius: 10px;
        font-size: 15px;
    }

    .searchDropdownContainer {
        background: #1A2226;
        margin: 0 auto;
        margin-top: -10px;
        border: 1px solid #D34084;
        border-radius: 10px;
        width: 390px;
        display: flex;
        flex-direction: column;
        max-height: 400px;
        overflow-x: scroll;
    }

    .iconMenuContainer {
        display: flex;
        margin-right: 10px;
        flex-grow: 1;
        justify-content: flex-end;
    }

    .iconMenu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
    }

    .iconMenuMiniContainer {
        display: none;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }

    .icons {
        width: 60px;
        height: 40px;
        color: #D34084;
    }

    /* @media (max-width:900px) {
        .iconMenuContainer {
            display: none;
        }

        .iconMenuMiniContainer {
            display: flex;
        }

    } */
</style>
