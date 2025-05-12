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

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      mensaje: '',
      error: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Importante para mantener la sesión
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al iniciar sesión');
        }

        this.mensaje = data.mensaje;
        this.error = false;
        this.$router.push('/'); //Redirección si te loggeas bien

      } catch (err) {
        this.mensaje = err.message;
        this.error = true;
      }
    }
  }
};
</script>
<!--
function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password'
    return
  }
  const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/
  if (!emailPattern.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  error.value = ''
  emit('login', { email: email.value, password: password.value })
}
</script>-->

<style scoped>
@import "@/css/login.css";
</style>
