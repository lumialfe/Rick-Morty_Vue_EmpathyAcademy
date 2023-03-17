import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import './assets/styles/style.css';
import {store} from "./store/store";

createApp(App).use(store).mount('#app');
