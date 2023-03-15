import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import {store} from "@/store/store";

import './assets/styles/style.css';

createApp(App).use(store).mount('#app');
