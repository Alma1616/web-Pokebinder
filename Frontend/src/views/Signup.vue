<!--Página de Signup-->
<template>
  <div class="signup-wrapper">
    <div class="signup-card">
      <img src="@/photos/masterBall.png" alt="Master Ball" class="logo" />
      <h1 class="title">PokéSignup</h1>
      <p class="subtitle">Gotta sign 'em all!</p>

      <!-- Formulario de SIGNUP (Parecido al de login) -->
      <form @submit.prevent="handleSignUp" novalidate>
        <label>
          <span>Trainer Email</span>
          <input v-model="email" type="email" placeholder="ash@pallet.town" required autocomplete="username" />
        </label>
        <label>
          <span>Password</span>
          <input v-model="password" type="password" placeholder="••••••••" required minlength="6"
            autocomplete="current-password" />
        </label>
        <label>
          <span>Region you live in (city):</span>
          <input v-model="city" type="text" placeholder="Ex:kanto,Hoenn" autocomplete="Kanto" required />
        </label>
        <label>
          <span>Favourite pokemon:</span>
          <input v-model="pokemonFav" type="text" placeholder="Pikachu, Snorlax..." autocomplete="Pikachu" required />
        </label>
        <button type="submit" class="signup-btn">Sign&nbsp;Up</button>
      </form>

      <!--Log-In-->
      <RouterLink to="/login" class="login-link">Already a trainer? Log&nbsp;In</RouterLink>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue' //Uso ref --> Mejor on código más grande
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('')
const password = ref('')
const city = ref('')
const pokemonFav = ref('')
const error = ref('')

async function handleSignUp() {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password'
    return
  }
  const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/
  if (!emailPattern.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  if (password.value.length < 6 ||       // menos de 6 caracteres
    !/[A-Z]/.test(password.value) ||        // no hay mayúscula
    !/\d/.test(password.value)              // no hay número
  ) {
    error.value =
      'Password must have at least 6 characters, 1 capital letter and 1 number.';
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        ciudad: city.value,
        pokemonFav: pokemonFav.value
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    alert('Signup completed');
    router.push('/')
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style scoped>
@import "@/css/signup.css";
</style>