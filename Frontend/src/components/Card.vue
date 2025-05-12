<template>
  <div class="card">
    <router-link :to="`/card/${card.id}`" class="card-image">
      <img :src="card.images.small" alt="Card image" />
    </router-link>

    <h3>{{ card.name }}</h3>
    <p class="card-type">{{ card.types?.join(', ') }}</p>

    <!-- Barra inferior con acciones -->
    <div class="card-footer">
      <!-- Botón owned -->
      <div class="footer-left" @click="toggleOwned">
        <div :class="['owned-toggle', { owned: owned }]"></div>
      </div>

      <div class="footer-right">
        <button @click="toggleMenu" class="menu-button">︙</button>

        <div v-if="showMenu" class="dropdown">
          <button @click="openCollectionSelector">Add to personal collection</button>
        </div>

        <div v-if="showCollectionSelector" class="dropdown">
          <p>Select collection:</p>
          <button v-for="col in userCollections" :key="col.id" @click="addToCollection(col.id)">
            {{ col.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  data() {
    return {
      owned: false,
      showMenu: false,
      showCollectionSelector: false,
      userCollections: []
    }
  },
  created() {
    const ownedSet = JSON.parse(localStorage.getItem('ownedCards') || '[]');
    this.owned = ownedSet.includes(this.card.id);

    const collections = JSON.parse(localStorage.getItem('userCollections') || '[]');
    this.userCollections = collections;
  },
  methods: {
    toggleOwned() {
      this.owned = !this.owned;
      let ownedSet = JSON.parse(localStorage.getItem('ownedCards') || '[]');

      if (this.owned && !ownedSet.includes(this.card.id)) {
        ownedSet.push(this.card.id);
      } else if (!this.owned) {
        ownedSet = ownedSet.filter(id => id !== this.card.id);
      }

      localStorage.setItem('ownedCards', JSON.stringify(ownedSet));
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
      this.showCollectionSelector = false;
    },
    openCollectionSelector() {
      this.showMenu = false;
      this.showCollectionSelector = true;
    },
    addToCollection(collectionId) {
      const key = `collection_${collectionId}`;
      const cards = JSON.parse(localStorage.getItem(key) || '[]');
      if (!cards.find(c => c.id === this.card.id)) {
        cards.push(this.card);
        localStorage.setItem(key, JSON.stringify(cards));
      }
      this.showCollectionSelector = false;
    }
  }
}
</script>

<style scoped>
@import '@/css/card.css'
</style>
