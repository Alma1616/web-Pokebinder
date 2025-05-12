import { createRouter, createWebHistory } from 'vue-router'

// Importar las vistas
import Home from '@/views/Home.vue'

import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import linkShops from '@/views/LinkShops.vue'
import OwnCollections from '@/views/OwnCollections.vue'
import ExistingCollections from '@/views/ExistingCollections.vue'
import CollectionViewPage from '@/views/CollectionViewPage.vue'
import CardInfo from '@/views/CardInfo.vue'
import CardRecom from '@/views/CardRecom.vue'
import Notices from '@/views/Notices.vue'
import CardsByType from '@/views/CardsByType.vue'
import Search from '@/views/Search.vue'
/*
import register from '@/views/register.vue'
import existingCollections from '@/views/existingCollections.vue'
import personalCollections from '@/views/personalCollections.vue

import infoUser from '@/views/infoUser.vue'
import logOut from '@/views/logOut.vue'*/

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {path: '/signup', component: Signup},
  { path: '/linkShops', component: linkShops },
  {path: '/ownCollections', component: OwnCollections },
  {path:'/existingCollections', component: ExistingCollections},
  {path: '/Collection/:id', component: CollectionViewPage },
  {path:'/OwnCollection/:id', component:CollectionViewPage},
  {path:'/card/:id', component:CardInfo},
  {path:'/cardRecom', component:CardRecom},
  {path:'/cardByType',component:CardsByType},
  { path: '/collection-type/:type', component: CardsByType },
  {path:'/notices',component:Notices},
  {path:'/search',component:Search}
 /* 
  { path: '/existingCollections', component: existingCollections },
  { path: '/ownCollections', component: personalCollections },
  { path: '/notOwnCollections', component: notOwnCollections },
  ,
  { path: '/infoUser', component: infoUser },
  { path: '/logOuut', component: logOut },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirige a home si no existe*/
]

const router = createRouter({
  history: createWebHistory(), //para que la URL sea correcta
  routes //rutas de la web
})

export default router
