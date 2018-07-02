<template>
    <img :width="size" :height="size" @click="toggle()" :src="artUrl" />    
</template>

<script>
export default {
    name: 'playable-album-art',
    data() {
        return {
            isPlaying: false
        };
    },
    props: {
        artUrl: String,
        audioUrl: String,
        size: String
    },
    computed: {
        audio() {
            var a = new Audio(this.audioUrl);
            a.volume = 0.1;
            return a;
        }
    },
    methods: {
        toggle() {
            if (!this.isPlaying) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
            this.isPlaying = !this.isPlaying;
        },
    }
}
</script>

<style scoped>

</style>
