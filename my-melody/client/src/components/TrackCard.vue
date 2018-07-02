<template>
    <div>
        <img :src="albumArt" :alt="title"/>
        <h1>{{ title }}</h1>
        <h2>{{ artist }}</h2>
    </div>
</template>

<script>
export default {
    name: 'track-card',
    props: {
        title: String,
        artist: String,
        albumArt: {
            default: require('../assets/blank-album-art.png'),
            type: String
        }
    }
}
</script>

<style scoped>
    div {
        width: 300px;
    }
    img {
        width: 100%;

    }
    h1 {
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
    h2 {
        color: white;
    }
</style>
