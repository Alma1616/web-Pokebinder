<template>
    <div class="shop-page">
        <h2 class="page-title">Shop recommendation for buying cards</h2>
        <hr class="divider" />

        <div class="product-gallery">
            <div class="product-item" v-for="(item, index) in products" :key="index">
                <img :src="item.image" :alt="item.title" class="product-image" />
                <h3 class="product-title">{{ item.title }}</h3>
                <a :href="item.link" target="_blank" rel="noopener noreferrer" class="product-link">
                    Shop here!
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const products = [
    {
        title: 'CardMarket',
        image: new URL('@/photos/shops/CardMarket.png', import.meta.url).href,
        link: 'https://www.cardmarket.com/es/Pokemon'
    },
    {
        title: 'TCG Pokemon',
        image: new URL('@/photos/shops/pokemonCompany.jpg', import.meta.url).href,
        link: 'https://tcg.pokemon.com/'
    },
    {
        title: 'AliExpress',
        image: new URL('@/photos/shops/AliExpress.jpg', import.meta.url).href,
        link: 'https://es.aliexpress.com/w/wholesale-pokemon-tcg.html?spm=a2g0o.home.search.0'
    }
];
</script>

<style>
    @import '@/css/linkShops.css'
</style>