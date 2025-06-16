<!--Segunda parte de la barra superior: Contiene el buscador y el botó para gestionar el usuario-->
<template>
  <nav class="searchBar">
    <ul>
      <li>
        <form @submit.prevent="searchCard()" class="search-box">
          <input v-model="busqueda" type="text" placeholder="Search for a card" required>
          <button type="submit">➔</button>
        </form>
      </li>
      <li>
        <nav id="menu">
          <img v-if="session.sesionIniciada" src="@/photos/userIcon1.png">
          <img v-else src="@/photos/userIcon.png">
          <ul>
            <!--Si está iniciada la sesion-->
            <li v-if="session.sesionIniciada">
              <router-link to="/infoUser">Account Data</router-link>
              <router-link to="#" @click.prevent="logout">Logout</router-link>
            </li>
            <li v-else>
              <router-link to="/login">Login</router-link>
              <router-link to="/signup">Signup</router-link>
            </li>
          </ul>
        </nav>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';

const router = useRouter();
const session = useSessionStore();
const busqueda = ref('');

function searchCard() {
  router.push({ path: '/search', query: { q: busqueda.value } });
}


async function logout() {
  try {
    await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }

  session.cerrarSesion(); // limpia estado global
  alert('Logout Completed!!')
  router.push('/'); 
}
</script>

<style>
@import '@/css/searchBar.css';
</style>