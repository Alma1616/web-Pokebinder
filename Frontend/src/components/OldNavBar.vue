<template>
  <nav class="navbar">
    <Header :sesionIniciada="sesionIniciada" />
    <SearchBar :sesionIniciada="sesionIniciada" />
  </nav>
</template>

<script>
import Header from './navBar.vue'
import SearchBar from './searchBar.vue'

export default {
  components: {
    Header,
    SearchBar
  },
  props: {
    sesionIniciada: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
@import '@/css/div1.css';
@import '@/css/div2.css';
@import '@/css/grid.css';

.navbar {
  display: flex;
  justify-content: space-between; /* Espacio entre Header y SearchBar */
  align-items: center;
  background-color: #951abe;
  padding: 10px 20px;
}
</style>
