<template>
  <div class="login-wrapper">
    <div class="login-card">
      <img src="@/photos/ditto.png" alt="Ditto" class="logo" />
      <h1 class="title">PokéLogin</h1>
      <p class="subtitle">Gotta log 'em all!</p>

      <!-- LOGIN FORM -->
      <form @submit.prevent="handleLogin" novalidate>
        <label>
          <span>Trainer Email</span>
          <input v-model="email" type="email" placeholder="ash@pallet.town" required autocomplete="username" />
        </label>
        <label>
          <span>Password</span>
          <input v-model="password" type="password" placeholder="••••••••" required minlength="6"
            autocomplete="current-password" />
        </label>
        <button type="submit" class="login-btn">Log&nbsp;In</button>
      </form>

      <RouterLink to="/signup" class="signup-link">New trainer? Sign&nbsp;up</RouterLink>

      <p v-if="error" class="error">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';

const email = ref('');
const password = ref('');
const mensaje = ref('');
const error = ref(false);

const session = useSessionStore();
const router = useRouter();

async function handleLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await response.json();

    if (!response.ok) {
      await session.verificarSesion(); //Verificamos session aunque no haya sido loggeado --> Dejarlo en false
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    mensaje.value = data.mensaje;
    error.value = false;

    await session.verificarSesion(); 
    alert('Login completed!!');
    router.push('/');

  } catch (err) {
    mensaje.value = err.message;
    error.value = true;
  }
}
</script>


<style scoped>
@import "@/css/login.css";
</style>
