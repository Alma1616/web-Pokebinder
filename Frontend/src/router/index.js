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
import ExistingCollectionsByType from '@/views/ExistingCollectionsByType.vue'
import CreateCollection from '@/views/CreateCollection.vue'
import OwnCollectionsView from '@/views/OwnCollectionsView.vue'
import infoUser from '@/views/AccountSettings.vue'
/*
import register from '@/views/register.vue'
import existingCollections from '@/views/existingCollections.vue'
import personalCollections from '@/views/personalCollections.vue


import logOut from '@/views/logOut.vue'*/

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {path: '/signup', component: Signup},
  { path: '/linkShops', component: linkShops },
  {path: '/ownCollections', component: OwnCollections },
  {path:'/existingCollections', component: ExistingCollections},
  {path: '/Collection/:id', component: CollectionViewPage },
  {path:'/OwnCollection/:id', component:OwnCollectionsView},
  {path:'/card/:id', component:CardInfo},
  {path:'/cardRecom', component:CardRecom},
  {path:'/cardByType',component:ExistingCollectionsByType},
  {path: '/collection-type/:type', component: CardsByType },
  {path:'/notices',component:Notices},
  {path:'/search',component:Search},
  {path:'/createCollection', component:CreateCollection},
  {path:'/infoUser', component:infoUser}
]

const router = createRouter({
  history: createWebHistory(), //para que la URL sea correcta
  routes //rutas de la web
})

export default router
