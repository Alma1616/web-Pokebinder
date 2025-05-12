<template> <!-- COMPONENTE QUE SE PONE EN COLLECTIONVIEWPAGE-->
  <div class="collection-container">
    <h1 class="collection-title"></h1>
    
    <div class="card-grid">
      <Card v-for="card in filteredCards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script>
import base1 from '@/pokemons/base1.json'
import Card from '@/components/Card.vue'
import base2 from '@/pokemons/base2.json'

export default {
  components: { Card },
  data() {
    return {
      allCards: []
    }
  },
  created() {
    this.allCards = [...base1, ...base2];
  },
  computed: {
    filteredCards() { //Función para filtarr cartas (ejemplo con los puntos de videa)
      return this.allCards //.filter(card => card.hp >= 0)
    }
  }
}
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
