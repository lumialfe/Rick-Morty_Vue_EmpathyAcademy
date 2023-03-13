import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

import './assets/styles/style.css'

const store = createStore({})

createApp(App).use(store).mount('#app')
