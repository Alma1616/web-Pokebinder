<!--Pequeño menú que permite crear una colección propia-->
<template>
  <div class="create-page">
    <h2>Create New Collection</h2>

    <form @submit.prevent="createCollection" class="form">
      <label for="name">Collection Name:</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Enter collection name"
        required
      />

      <button type="submit">Create</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';

const name = ref('');
const errorMessage = ref('');
const router = useRouter();
const session = useSessionStore();

const createCollection = async () => {
  if (!session.sesionIniciada) {
    errorMessage.value = 'You must be logged in.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name: name.value }) 
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create collection');
    }

    router.push('/owncollections');
  } catch (err) {
    errorMessage.value = err.message;
    console.error('Error creating collection:', err);
  }
};

</script>

<style scoped>
.create-page {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  padding: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  align-items: center;
}

input {
  font-family: 'Press Start 2P', cursive;
  padding: 10px;
  width: 300px;
  border: 2px solid #951abe;
  border-radius: 8px;
  font-size: 0.8rem;
}

button {
  padding: 10px 20px;
  background-color: #951abe;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #7414a1;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
