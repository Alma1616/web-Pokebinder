<template>
  <!-- MUESTRA LA INFO DE LA CARTA AL HACER CLICK EN ELLA -->
  <div class="info-container" v-if="card">
    <div class="card-info">
      <img :src="card.imageUrl" alt="Full card image" />

      <div class="card-details">
        <h1>{{ card.name }}</h1>
        <p><strong>Type:</strong> {{ card.types?.join(', ') }}</p>
        <p><strong>HP:</strong> {{ card.hp }}</p>
        <p><strong>Rarity:</strong> {{ card.rarity }}</p>
      
        <div v-if="card.attacks?.length">
          <h3>Attacks:</h3>
          <ul>
            <li v-for="attack in card.attacks" :key="attack.name">
              <strong>{{ attack.name }}</strong> – {{ attack.damage }}<br />
              <small>{{ attack.text }}</small>
            </li>
          </ul>
        </div>

        <p class="flavor-text" v-if="card.flavorText">"{{ card.flavorText }}"</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: null
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await fetch(`http://localhost:3000/api/cards/${id}`, {
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error(`Card not found: ${id}`);
      }

      this.card = await res.json();
    } catch (err) {
      console.error('Error loading card details:', err);
    }
  }
}
</script>

<style scoped>
@import '@/css/CardInfo.css';
</style>
