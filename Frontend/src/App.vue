<template>
  <div id="app" class="layout">
    <div class="header">
      <div class="navbar">
        <Navbar />
      </div>
      <div class="searchbar">
        <SearchBar />
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    SearchBar
  },
}

</script>
<style>  /* quitar hueco que sobresalia */
html, body {
  height: 100%;
  margin: 0;           
  padding: 0;
}

#app, .layout {
  height: 100%;
  width: 100%;
}
img, video{
  max-width:100%;
  height:auto;
}
</style>

<style scoped>
@import "@/css/app.css"
</style>
