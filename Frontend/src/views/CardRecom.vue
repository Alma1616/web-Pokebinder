<template>
    <div class="recommendation-page">
        <div class="page-title">
            <p>DRAW A CARD!!</p>
        </div>
        <button @click="random">Show a card recommendation, what would it be?</button>
        <div v-if="randomCard" class="card-img"> <!--Se muestra si hay una carta seleccionada-->
            <h2 class="text-xl font-bold mb-2">Our recommendation:</h2>
            <Card :card="randomCard" />
        </div>
    </div>
</template>
<script>
import base1 from '@/pokemons/base1.json'
import base2 from '@/pokemons/base2.json'
import Card from '@/components/Card.vue'
export default {
    components:{
        Card
    },
    data() {
        return {
            allCards: [],
            randomCard: null
        }
    },
    created() {
        this.allCards = [...base1, ...base2]; //concatenar los dos json
    },
    methods: {
        random() {
            const randomIndex = Math.floor(Math.random() * this.allCards.length);
            this.randomCard = this.allCards[randomIndex];

        }
    }
}
</script>
<style>
.recommendation-page {
    background: linear-gradient(135deg, #ffe9f5, #d7c7f4);
    min-height: 100vh;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
}

.page-title p {
    font-size: 1.5rem;
    color: #951abe;
    margin-bottom: 2rem;
    text-shadow: 1px 1px #fff;
}

button {
    background-color: #951abe;
    color: white;
    padding: 14px 28px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.3s ease;
    font-family: 'Press Start 2P', cursive;
}

button:hover {
    background-color: #7414a1;
    transform: scale(1.05);
}

.card-img {
    margin-top: 2rem;
}

h2 {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1rem;
}
</style>