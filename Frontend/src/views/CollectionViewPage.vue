<template> <!--MUESTRA LAS CARTAS DE LAS COLECCIONES-->
    <div v-if="collection">
        <CollectionView :collection="collection" />
    </div>
    <div v-else>
        <p>No cards yet :(</p>
    </div>
</template>

<script>
import CollectionView from '@/components/CollectionView.vue';
//Import de las fotos
import bulbasaurImg from '@/photos/bulbasaur.jpg';
import squirtleImg from '@/photos/squirtle.jpg'

export default {
    name: 'CollectionViewPage',
    components: { CollectionView },
    data() {
        return {
            collection: null
        };
    },
    created() {
        const collectionId = this.$route.params.id;

        // Simulación de obtención de datos, reemplazar con llamada a API si aplica
        const mockCollections = [
            {
                id: '1.1',
                name: 'Base collection',
                description: 'The first 151 pokemon.',
                cards: [
                    { id: 1, name: 'Bulbasaur', imageUrl: bulbasaurImg },
                    { id: 2, name: 'Squirtle', imageUrl: squirtleImg }
                ]
            }
        ];

        this.collection = mockCollections.find(c => c.id === collectionId);
    }
};
</script>
<style scoped>
 p{
  font-family: 'Press Start 2P', cursive;
  display: flex;
  justify-content: center;
  font-size: 2.5em;

 }
</style>