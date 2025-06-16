<!--Vistas de una coleccion personalizadas del usuario(muestra la propia coleccion con sus cartas)-->
<template>
    <div v-if="collection">
        <CollectionView :title="collection.name" :cards="collection.cards" />
    </div>
    <div v-else>
        <p>No cards yet :(</p>
    </div>
</template>

<script>
import CollectionView from '@/components/CollectionView.vue';

export default {
    name: 'CollectionViewPage',
    components: { CollectionView },
    data() {
        return {
            collection: null
        };
    },
    async created() {
        const collectionId = this.$route.params.id;

        try {
            const res = await fetch(`http://localhost:3000/api/me/collections/${collectionId}`, {
                credentials: 'include'
            });
            const data = await res.json();

            if (data && data.name && Array.isArray(data.cards)) {
                this.collection = data;
            } else {
                console.warn('Invalid collection data format:', data);
            }
        } catch (err) {
            console.error('Error loading collection:', err);
        }
    }
};
</script>

<style scoped>
p {
    font-family: 'Press Start 2P', cursive;
    display: flex;
    justify-content: center;
    font-size: 2.5em;
}
</style>
