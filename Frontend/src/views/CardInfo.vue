<template><!--MUESTRA LA INFO DE LA CARTA AL HACER CLICK EN ELLA-->
  <div class="info-container" v-if="card">
    <div class="card-info">
      <img :src="card.images.large" alt="Full card image" />

      <div class="card-details">
        <h1>{{ card.name }}</h1>
        <p><strong>Type:</strong> {{ card.types?.join(', ') }}</p>
        <p><strong>HP:</strong> {{ card.hp }}</p>
        <p><strong>Rarity:</strong> {{ card.rarity }}</p>
        <p><strong>Pokédex Number:</strong> {{ card.nationalPokedexNumbers?.[0] }}</p>

        <div v-if="card.abilities?.length">
          <h3>Abilities:</h3>
          <ul>
            <li v-for="ability in card.abilities" :key="ability.name">
              <strong>{{ ability.name }}:</strong> {{ ability.text }}
            </li>
          </ul>
        </div>

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
import cardData from '@/pokemons/base1.json'

export default {
  data() {
    return {
      card: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.card = cardData.find(c => c.id === id) //Para guardar la info en la carta
  }
}
</script>

<style scoped>
@import '@/css/CardInfo.css'; 
</style>
