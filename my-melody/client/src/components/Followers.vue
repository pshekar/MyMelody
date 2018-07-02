<template>
    <div>
        <div v-on:click="navigate(follower)" class="follower" v-for="follower in followers">
            <icon class="pro-pic" name="user"></icon><p><span class="new" v-if="follower.new">*new*</span> {{follower.username}}</p>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'followers',
    components: {
        Icon
    },
    computed: {
        user() {
            return this.$store.getters.currentUser;
        },
        followers: {
            get: function() {
                return this.user.followers;
            },
            set: function(value) {
                this.user.followers = value;
            }
        }
    },
    destroyed: function() {
        this.clearNew();
    },
    methods: {
        navigate(follower) {
            this.$router.push({
                path: `/user/${follower.username}`
            });
        },
        clearNew() {
            this.followers =  this.followers.map(follower => { 
                follower.new = false;
                return follower;
            });
            this.$store.dispatch("editFollowers", this.user);
        }
    }
}
</script>

<style scoped>
    .follower {
        display: flex;
        align-items: center; 
        padding: 10px 20px;
        border-bottom: 2px solid #0C1012;
    }

    .follower:nth-child(odd) {
       color: #D34084;
    }

    .follower:nth-child(even) {
        color: #ffffff;
    }

    .follower:last-child {
        border-bottom: none;
    }

    .pro-pic {
        width: 40px;
        height: 40px;
        border: 2px solid;
        border-radius: 60px;
        cursor: pointer;
    }

    p {
        display: inline-block;
        padding: 0 30px;
        color: #ffffff;
        font-size: 1.1em;
        cursor: pointer;
    }

    p:hover {
        color: #D34084;
    }

    .new {
        color: #D34084;
        text-transform: uppercase;
        padding-right: 5px;
    }
</style>
