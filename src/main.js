import { createApp } from 'vue';
import Toaster from '@meforma/vue-toaster';
import 'vue-toast-notification/dist/theme-sugar.css';
import router from './router';
import store from './store';
import App from './App.vue';
import './index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(Toaster, { position: 'top' })
    .mount('#app')
