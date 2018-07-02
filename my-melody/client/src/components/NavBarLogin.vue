<template>
    <div class="navBarLoginContainer">
        <router-link to="/" class="projectLogo">{{ projectNameMessage }}</router-link>
    </div>
</template>

<script>
    export default {
        name: 'NavBarLogin',
        data: function() {
            return {
                projectNameMessage: 'Vibe'
            }
        }
    }
</script>

<style scoped>
    .navBarLoginContainer {
        width: 100%;
        color: #FFFFFF;
        height: 120px;
        text-align: center;
        margin-top: 30px;
    }

    .projectLogo {
        font-size: 60px;
        vertical-align: middle;
        line-height: 120px;
        font-weight: 600;
        color: #D34084;
        text-decoration: none;
    }
</style>
