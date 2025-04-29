<template>
    <div class="header">
      <div class="logo">
        <router-link to="/">PokeBinder</router-link>
      </div>
      <nav class="nav-links">
        <ul>
          <li ><router-link to="/existingCollections"><a id="existing">Existing Collections</a></router-link></li>
          <li ><router-link to="/ownCollections"><a id="own">Own Collections</a></router-link></li>
          <li><router-link to="/shops"><a id="shop">Links to shop</a></router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>

  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
    @import '@/css/NavBar.css';
  </style>
  