<template>
    <nav class="botNavBarContainer">
        <div class="pageLinksContainer">
            <router-link to="about" class="pageLinks">{{ aboutMessage }}</router-link>
            <router-link to="team" class="pageLinks">{{ teamMessage }}</router-link>
        </div>
        <header>{{ projectMessage }}</header>
    </nav>
</template>

<script>
    export default {
        name: 'BotNavBar',
        data: function() {
            return {
                aboutMessage: 'About',
                teamMessage: 'Team',
                projectMessage: 'Vibe 2018'
            }
        }
    }
</script>

<style scoped>
    header {
        color: #F5F5F5;
    }

    .pageLinksContainer {
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
    }

    .pageLinks {
        text-decoration: none;
        color: #F5F5F5;
        padding: 0 10px;
        width: 40%;
    }

    .botNavBarContainer {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        padding-bottom: 10px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
