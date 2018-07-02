<template>
    <div>
        <search-dialog v-if="dialogState === 'search'"></search-dialog>
        <add-post-dialog v-if="dialogState === 'add'" @hide="$emit('hide')"></add-post-dialog>
    </div>
</template>

<script>
import SearchDialog from '@/components/SearchDialog.vue';
import AddPostDialog from '@/components/AddPostDialog.vue';

export default {
    name: 'post-wrapper',
    created: function() {
        this.$store.commit('postModalState', 'search');
    },
    computed: {
        dialogState() {
            return this.$store.getters.postModalState;
        }
    },
    components: {
        SearchDialog,
        AddPostDialog
    },
}
</script>