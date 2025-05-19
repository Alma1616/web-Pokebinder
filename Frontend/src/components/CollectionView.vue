<!-- COMPONENTE QUE SE PONE EN COLLECTIONVIEWPAGE-->
<template>
  <div class="collection-container">
    <h1 class="collection-title">{{ title }}</h1>
    <div class="card-grid">
      <Card v-for="card in cards" :key="card.card_id" :card="card" />
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.collection-container {
  padding: 2rem;
  background: linear-gradient(145deg, white, #951abe 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.collection-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  font-family: 'Press Start 2P', cursive;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}
</style>
