import { createRouter, createWebHistory } from 'vue-router'

// Importar las vistas
import Home from '@/views/Home.vue'

import Login from '@/views/Login.vue'
/*
import register from '@/views/register.vue'
import existingCollections from '@/views/existingCollections.vue'
import personalCollections from '@/views/personalCollections.vue'
import notOwnCollections from '@/views/notOwnCollections.vue'
import linkShops from '@/views/linkShops.vue'
import infoUser from '@/views/infoUser.vue'
import logOut from '@/views/logOut.vue'*/

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
 /* { path: '/register', component: register },
  { path: '/existingCollections', component: existingCollections },
  { path: '/ownCollections', component: personalCollections },
  { path: '/notOwnCollections', component: notOwnCollections },
  { path: '/linkShops', component: linkShops },
  { path: '/infoUser', component: infoUser },
  { path: '/logOuut', component: logOut },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirige a home si no existe*/
]

const router = createRouter({
  history: createWebHistory(), //para que la URL sea correcta
  routes //rutas de la web
})

export default router
