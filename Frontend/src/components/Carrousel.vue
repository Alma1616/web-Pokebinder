<template>
    <div class="carousel">
      <transition name="fade" mode="out-in">
        <img :key="current" :src="photos[current]" class="slide" />
      </transition>
      <button class="nav prev" @click="prev" aria-label="Anterior">‹</button>
      <button class="nav next" @click="next" aria-label="Siguiente">›</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const photos = [
    new URL('@/photos/home/charizard.png', import.meta.url).href,
    new URL('@/photos/home/cards.png', import.meta.url).href,
    new URL('@/photos/home/ETB2.jpg', import.meta.url).href
  ]
  const current = ref(0)
  
  function next ()  { current.value = (current.value + 1) % photos.length }
  function prev ()  { current.value = (current.value - 1 + photos.length) % photos.length }
  </script>
  
  <style scoped>
  @import '@/css/carousel.css';
  </style>
  