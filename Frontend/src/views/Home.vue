<template>
  <div class="parent">
    <div class="div1">
      <Carrousel />
    </div>
    <div class="div2">
      <img src="@/photos/home/pokeball.jpg" alt="Collections" class="card-image">
      <router-link to="/existingCollections" class="card-button">Collections <a>→</a></router-link>
    </div>
    <div class="div3">
      <img src="@/photos/home/energy.jpg" alt="Type cards" class="card-image">
      <router-link to="/cardByType" class="card-button">Cards by type <a>→</a></router-link>
    </div>
    <div class="div4">
      <img src="@/photos/home/pokemons1.webp" alt="Card Recommendation" class="pokemons-recom">
      <router-link to="/cardRecom" class="card-button">Card recommendation <a>→</a></router-link>
    </div>
    <div class="div5">
      <router-link to="/notices">
        <button class="bigButton">
          <span class="buttonText" style="text-decoration: none;">Latest Pokemon news here!!!</span>
          <span class="arrowBox">➔</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Carrousel from '@/components/Carrousel.vue';

export default {
  name: 'Home',
  components: {
    Carrousel
  }
}
</script>

<style scoped>
@import '@/css/home.css';
@import '@/css/div5.css';
@import '@/css/div2.css';
@import '@/css/div3.css';
@import '@/css/div4.css'
</style>
