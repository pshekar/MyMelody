<template>
    <nav class="container">
        <h1>{{ projectName }}</h1>
        <!-- <router-link to="/about">About</router-link>
        <router-link to="/team">Team</router-link> -->
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data: function() {
        return {
            projectName: 'MyMelody'
        }
    }
}
</script>

<style scoped>
nav {
    width: auto;
    margin-top: 60px;
    margin-bottom: 60px;
    color: #2bb38b;
    display: flex;
    align-items: flex-start;
}

h1 {
    font-weight: 500;
    font-size: 30px;
    flex-grow: 5;
    letter-spacing: 2px;
}

a {
    border: none;
    box-sizing: border-box;
    font-size: 20px;
    cursor: pointer;
    letter-spacing: 2px;
    text-decoration: none;
    color: inherit;
    background-color: buttonface;
    padding: 10px 5px;
    margin: 0 12px;
}

a:hover {
    border-bottom: 2px solid #2bb38b;
}
</style>
