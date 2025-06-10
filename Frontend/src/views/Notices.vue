<template>
  <div class="notices-page">
    <h1 class="page-title">Pokemon News</h1>

    <div v-if="notices.length === 0" class="no-news"> <!--Si falla o no hay noticias -- Medida preventiva --> 
      <p>No news available.</p>
    </div>

    <div v-else>
      <div v-for="notice in notices" :key="notice.notice_id" class="notice-line">
        <h2 class="notice-title">{{ notice.title }}</h2>
        <!--Establece el link de la web con la noticia-->
        <a :href="notice.content" target="_blank" rel="noopener" class="notice-link">Read more</a>
        <div class="divider"></div> <!--Linea que separa las noticias-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const notices = ref([]);

//Funcion con call al backend --> Devuelve las noticias 
const fetchNotices = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/notices', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to load notices');
    notices.value = await res.json();
  } catch (err) {
    console.error('Error loading notices:', err);
    notices.value = [];
  }
};

onMounted(fetchNotices);
</script>

<style scoped>
.notices-page {
  font-family: 'Press Start 2P', cursive;
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.notice-line {
  width: 100%;
  margin-bottom: 40px;
}

.notice-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #951abe;
}

.notice-link {
  display: inline-block;
  font-size: 0.9rem;
  color: black;
  text-decoration: underline;
  margin-bottom: 10px;
}

.divider {
  height: 4px;
  background-color: #951abe;
  margin-top: 16px;
}
</style>
