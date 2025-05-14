<template>
    <div class="collections-page">
        <div v-if="!session.sesionIniciada" class="not-logged">
            <h2 class="warning-text">You need to be logged in to see your collections</h2>
            <router-link to="/login" class="login-button">Log in</router-link>
        </div>

        <div v-else>
            <h2 class="collections-title">Your custom collections</h2>
             <div class="collections-grid">
            <router-link v-for="(collection, index) in collections" :key="index" :to="`/OwnCollection/${collection.id}`" 
            class="collection-box"> 
                <img :src="editIcon" alt="Edit" class="edit-icon" />
                <h3 class="collection-title">{{ collection.name }}</h3>
            </router-link>
            <router-link to="/create-collection" class="create-box">
                <button class="create-button">+</button>
                <p>Create collection</p>
            </router-link>
        </div> </div>
    </div>
</template>

<script setup>
import { useSessionStore } from '@/stores/session';
const session = useSessionStore();
import { ref } from 'vue'

// Simulación de colecciones del usuario --> 2. Colecciones personalizadas
const collections = ref([
    { id: 2.1, name: 'Collection 1' },
    { id: 2.2, name: 'Collection 2' },
    { id: 2.3, name: 'Collection 3' }
])

const editIcon = new URL('@/photos/iconoLapiz.png', import.meta.url).href
</script>

<style scoped>
.collections-page {
    background: linear-gradient(145deg, white, #951abe 100%);
    font-family: 'Press Start 2P', cursive;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.not-logged .warning-text {
    font-size: 2rem;
    margin-bottom: 20px;
}

.login-button {
    display: inline-block;
    background-color: #951abe;
    color: white;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.3s ease;
    font-size: 1.2rem;
}

.login-button:hover {
    background-color: #7414a1;
}

.collections-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
}
.collections-title {
    font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  color: black;
}

.collection-box{
    width: 250px;
    height: 200px;
    background-color: white;
    border: 2px solid #951abe;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
}

.create-box {
    width: 250px;
    height: 200px;
    background-color: white;
    border: 2px dashed #951abe;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
}

.collection-box:hover,
.create-box:hover {
    background-color: #f0dfff;
}

.edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    filter: blur(1px);
}

.collection-box:hover .edit-icon {
    opacity: 0.5;
}

.create-button {
    background-color: #951abe;
    color: white;
    font-size: 2rem;
    padding: 15px 20px;
    border: none;
    border-radius: 50%;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.create-button:hover {
    background-color: #7414a1;
}

.collection-title {
    font-size: 1rem;
    color: #333;
}
</style>