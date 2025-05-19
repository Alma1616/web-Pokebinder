<template>
  <div class="collections-page">
    <div>
      <h2 class="collections-title">Results for "{{ search }}"</h2>

      <div v-if="results.length > 0" class="collections-grid">
        <Card v-for="card in results" :key="card.card_id" :card="card" />
      </div>

      <p v-else class="text-lg mt-6">No matches for "{{ search }}" found in our database.</p>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: { Card },
  data() {
    return {
      search: '',
      results: []
    };
  },
  created() {
    this.search = this.$route.query.q || '';
    this.buscar();
  },
  watch: {
    '$route.query.q'(newQuery) {
      this.search = newQuery;
      this.buscar();
    }
  },
  methods: {
    async buscar() {
      const q = this.search.trim(); //elimina posibles espacios blancos
      if (!q) return; //Si user no escribe nada --> Evita hacer la call vacía

      try {
        const res = await fetch(`http://localhost:3000/api/cards/search/${encodeURIComponent(q)}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Search failed');
        this.results = await res.json();
      } catch (err) {
        console.error('Error fetching search results:', err);
        this.results = [];
      }
    }
  }
};
</script>

<style>
@import '@/css/existingCollections.css'
</style>
