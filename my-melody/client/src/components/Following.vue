<template>
    <div>
        <div v-on:click="navigate(followee)" class="following" v-for="followee in following">
            <icon class="pro-pic" name="user"></icon><p>{{followee}}</p>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'following',
    components: {
        Icon
    },
    computed: {
        following() {
            return this.$store.getters.currentUser.following;
        }
    },
    methods: {
        navigate(user) {
            if (user.substring(0,1) !== '#') {
                this.$router.push({
                    path: `/user/${user}`
                })
            }
            else {
                var percent = '%23' + user.substring(1);
                this.$router.push({
                    path: `/tag/${percent}`
                })
            }
        }
    }
}
</script>

<style scoped>
    .following {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 2px solid #0C1012;
    }

    .following:nth-child(odd) {
       color: #D34084;
    }

    .following:nth-child(even) {
        color: #ffffff;
    }

    .following:last-child {
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
</style>
