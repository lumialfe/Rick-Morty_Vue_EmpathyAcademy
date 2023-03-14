import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import {store} from "@/store/store";

import './assets/styles/style.css';

const store2 = createStore({
    state: {
    }, getters: {

    }, actions: {

    }, mutations: {

    }
});

createApp(App).use(store).mount('#app');
