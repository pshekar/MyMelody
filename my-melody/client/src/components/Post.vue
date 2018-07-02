<template>
    <div>
        <div>
            <h2>{{post.username}}</h2>
            <span class="save">+</span>
        </div>
        <img :src="post.track.albumArt" :alt="post.track.title"/>
        <div>
            <h1>{{post.track.title}} - {{post.track.artist}}</h1>
            <p>{{post.caption}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post',
    props: {
        post: {
            type: Object,
            default: {
                username: null,
                track: {
                    trackId: null,
                    title: null,
                    artist: null,
                    albumArt: null,
                    service: null
                },
                caption: null,
                posted: null
            },
            required: true
        }
    },
}
</script>

<style scoped>

</style>
