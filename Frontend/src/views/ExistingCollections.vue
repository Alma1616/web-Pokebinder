<template>
    <div class="collections-page">
        <div>
            <h2 class="collections-title">Pokemon TCG Collections</h2>
            <div class="collections-grid">
                <router-link v-for="(collection, index) in collections" :key="index"
                    :to="`/Collection/${collection.id}`" class="collection-box">
                    <img :src="seeIcon" alt="Edit" class="edit-icon" />
                    <h3 class="collection-title">{{ collection.name }}</h3>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Simulación de query a la BD
const collections = ref([
    { id: 1.1, name: 'Collection 1', photo:'' },
    { id: 1.2, name: 'Collection 2', photo:''},
    { id: 1.3, name: 'Collection 3', photo:''}
])

const seeIcon = new URL('@/photos/iconoOjo.png', import.meta.url).href
</script>

<style scoped>
@import '@/css/existingCollections.css';
</style>