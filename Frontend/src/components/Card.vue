<!--Componente que muestra las Cartas(con el botón y desplegable)-->
<template>
  <div class="card">
    <router-link :to="`/card/${card.card_id}`" class="card-image">
      <img :src="card.imageUrl" :alt="card.name" />
    </router-link>

    <h3>{{ card.name }}</h3>
    <p class="card-type">{{ card.types?.join(', ') }}</p>

    <div class="card-footer">
      <div class="footer-left" @click="toggleOwned">
        <div :class="['owned-toggle', { owned: owned }]"></div>
      </div>

      <div class="footer-right">
        <button @click="toggleMenu" class="menu-button">︙</button>

        <div v-if="showMenu" class="dropdown">
          <button @click="openAddSelector">Add to personal collection</button>
          <button @click="openDeleteSelector">Delete from own collection</button>
        </div>

        <div v-if="showCollectionSelector" class="dropdown">
          <p>Select collection:</p>
          <button v-for="col in userCollections" :key="col.id" @click="addToCollection(col.id)">
            {{ col.name }}
          </button>
        </div>

        <div v-if="showDeleteSelector" class="dropdown">
          <p>Select collection to remove from:</p>
          <button v-for="col in userCollections" :key="col.id" @click="deleteFromCollection(col.id)">
            {{ col.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSessionStore } from '@/stores/session';

export default {
  props: ['card'],
  data() {
    return {
      owned: false,
      showMenu: false,
      showCollectionSelector: false,
      showDeleteSelector: false,
      userCollections: []
    };
  },
  async created() {
    const session = useSessionStore();

    const ownedSet = JSON.parse(localStorage.getItem('ownedCards') || '[]');
    this.owned = ownedSet.includes(this.card.card_id);

    if (session.sesionIniciada) {
      try {
        const res = await fetch(`http://localhost:3000/api/me/collections`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Error loading collections');
        const data = await res.json();
        this.userCollections = data.collections;
      } catch (err) {
        console.error('Failed to fetch user collections:', err);
      }
    }
  },
  methods: {
    toggleOwned() {
      this.owned = !this.owned;
      let ownedSet = JSON.parse(localStorage.getItem('ownedCards') || '[]');

      if (this.owned && !ownedSet.includes(this.card.card_id)) {
        ownedSet.push(this.card.card_id);
      } else if (!this.owned) {
        ownedSet = ownedSet.filter(id => id !== this.card.card_id);
      }

      localStorage.setItem('ownedCards', JSON.stringify(ownedSet));
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
      this.showCollectionSelector = false;
      this.showDeleteSelector = false;
    },
    openAddSelector() {
      this.showMenu = false;
      this.showCollectionSelector = true;
      this.showDeleteSelector = false;
    },
    openDeleteSelector() {
      this.showMenu = false;
      this.showCollectionSelector = false;
      this.showDeleteSelector = true;
    },
    async addToCollection(collectionId) {
      try {
        const res = await fetch(`http://localhost:3000/api/collections/${collectionId}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            card_id: this.card.card_id,
            name: this.card.name,
            imageUrl: this.card.imageUrl
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to add card');
        }

        alert(`Card added to collection successfully!!`);
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }

      this.showCollectionSelector = false;
    },
    async deleteFromCollection(collectionId) {
      try {
        const res = await fetch(`http://localhost:3000/api/collections/${collectionId}/cards/${this.card.card_id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to delete card');
        }
        this.$router.push('/owncollections'); //enviar a collections para eliminar la crata de la vista
        alert(`Card removed from collection successfully!!`);

      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }

      this.showDeleteSelector = false;
    }
  }
};
</script>

<style scoped>
@import '@/css/card.css';
</style>
