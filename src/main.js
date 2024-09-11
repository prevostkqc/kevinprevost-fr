
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/styles/main.scss';


// Crée et monte l'application Vue avec le routeur et le store
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');