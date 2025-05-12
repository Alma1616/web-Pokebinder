<template>
  <div class="collections-page">
    <div>
      <h2 class="collections-title">Results for "{{ search }}"</h2>

      <div v-if="results.length > 0" class="collections-grid">
        <Card v-for="card in results" :key="card.id" :card="card" />
      </div>

      <p v-else class="text-lg mt-6">No matches for "{{ search }}" found in our database.</p>
    </div>
  </div>
</template>

<script>
import cards from '@/pokemons/base1.json';
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
    buscar() {
      const q = this.search.trim().toLowerCase();
      this.results = cards.filter(card =>
        card.name.toLowerCase().includes(q)
      );
    }
  }
};
</script>

<style>
@import '@/css/existingCollections.css'
</style>
