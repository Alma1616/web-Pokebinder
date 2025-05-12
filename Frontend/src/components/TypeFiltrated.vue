<template>
    <div class="type-list">
        <button v-for="type in uniqueTypes" :key="type" @click="goToType(type)">
            {{ type }}
        </button>
    </div>
</template>

<script>
import base1 from '@/Pokemons/base1.json';
import base2 from '@/Pokemons/base2.json';

export default {
    computed: {
        uniqueTypes() {
            const allCards = [...base1, ...base2];
            const types = allCards.flatMap(card => card.types || []);
            return [...new Set(types)];
        }
    },
    methods: {
        goToType(type) {
            this.$router.push({ name: 'CardsByType', params: { type } });
        }
    }
};
</script>
