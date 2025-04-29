<template>
    <nav class="searchBar">
      <ul>
        <li>
          <form @submit.prevent="buscarCarta" class="search-box">
            <input v-model="busqueda" type="text" placeholder="Search for a card" required>
            <button type="submit">➔</button>
          </form>
        </li>
        <li>
          <nav id="menu">
            <img v-if="sesionIniciada" src="@/photos/userIcon1.png">
            <img v-else src="@/photos/userIcon.png">
            <ul>
                <!--Si está iniciada la sesion-->
            <li v-if="sesionIniciada">
              <router-link to="/infoUser">Account Data</router-link>
              <router-link to="/logOut">Logout</router-link>
            </li>
            <li v-else>
              <router-link to="/login">Login</router-link>
              <router-link to="/register">Signup</router-link>
            </li>
            </ul>
          </nav>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    sesionIniciada: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      busqueda: ''
    }
  },
  methods: {
    buscarCarta() {
      this.$router.push({ path: '/buscar', query: { q: this.busqueda } });
    }
  }
}
</script>

<style>
  @import '@/css/searchBar.css';
</style>