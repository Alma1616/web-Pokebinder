<template>
    <div class="collections-page">
        <div>
            <h2 class="collections-title">Pokémon TCG Collections by Type</h2>
            <div class="collections-grid">
                <router-link v-for="(collection, index) in collections" :key="index"
                    :to="`/collection-type/${getTypeFromName(collection.name)} Type`" class="collection-box">
                    <!--Para ver el ojo y poder poner el nombre a la colección-->
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
        collections.value = data.filter(c => c.category === 'type');

    } catch (err) {
        console.error('Error loading collections by type:', err);
    }
});

// Extraer el tipo de pokemon
function getTypeFromName(name) {
    return name.replace(' Type', '').toLowerCase();
}
</script>

<style scoped>
@import '@/css/existingCollections.css';
</style>
