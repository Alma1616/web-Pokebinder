<template>
    <div class="collections-page">
        <div>
            <h2 class="collections-title">Pokémon TCG Collections</h2>
            <div class="collections-grid">
                <router-link v-for="(collection, index) in collections" :key="index"
                    :to="`/collection/${collection.id}`" class="collection-box">
                    <img :src="seeIcon" alt="See" class="edit-icon" />
                    <h3 class="collection-title">{{ collection.name }}</h3>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const collections = ref([]);
const seeIcon = new URL('@/photos/iconoOjo.png', import.meta.url).href;

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/api/predefined', {
            credentials: 'include'
        });
        const data = await res.json();

        // NO queremos las que son de tipos
        collections.value = data.filter(c => c.category !== 'type');

    } catch (err) {
        console.error('Error loading collections:', err);
    }
});
</script>

<style scoped>
@import '@/css/existingCollections.css';
</style>
