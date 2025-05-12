<template>
    <div>
        <h2>Cartas de tipo: {{ type }}</h2>
        <div class="card-grid">
            <div v-for="card in filteredCards" :key="card.id" class="card">
                <img :src="card.images.small" :alt="card.name" />
                <p>{{ card.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import base1 from '@/Pokemons/base1.json';
import base2 from '@/Pokemons/base2.json';

export default {
    props: ['type'],

    data() {
        return {
            allCards: [...base1, ...base2],
            type: this.$route.params.type
        };
    },

    computed: {
        filteredCards() {
            return this.allCards.filter(card =>
                (card.types || []).includes(this.type)
            );
        }
    },

    watch: {
        '$route.params.type': {
            handler(newType) {
                this.type = newType;
            },
            immediate: true
        }
    }
};
</script>
