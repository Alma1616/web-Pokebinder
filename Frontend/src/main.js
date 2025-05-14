import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia'; // nos ayudará a guardar las variables de sesión --> Globales

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);     
app.use(router);    

app.mount('#app');  