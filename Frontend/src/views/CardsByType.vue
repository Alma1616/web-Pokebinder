<template>
  <CollectionView
    v-if="collection && collection.name && collection.cards"
    :title="collection.name"
    :cards="collection.cards"
  />
  <p v-else>No cards yet :(</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CollectionView from '@/components/CollectionView.vue';

const route = useRoute();
const collection = ref(null);

onMounted(async () => {
  const type = route.params.type;

  try {
    const res = await fetch(`http://localhost:3000/api/predefined/${type}`, {
      credentials: 'include'
    });

    const data = await res.json();

    if (data && data.name && Array.isArray(data.cards)) {
      collection.value = data;
    } else {
      console.warn('Formato de colección inválido:', data);
    }

  } catch (err) {
    console.error('Error loading collection by type:', err);
  }
});
</script>

<style scoped>
p {
  font-family: 'Press Start 2P', cursive;
  display: flex;
  justify-content: center;
  font-size: 2.5em;
}
</style>
