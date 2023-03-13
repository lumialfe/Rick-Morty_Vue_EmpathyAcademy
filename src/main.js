import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import './assets/styles/style.css';

const store = createStore({
    state: {
        isShowingEpisodes: false,
    },
    getters: {
        getShowingEpisodes(state) {
            return state.isShowingEpisodes;
        }
    },
    mutations: {
        setShowingEpisodes(state, value) {
            state.isShowingEpisodes = value;
        }
    }
});


createApp(App).use(store).mount('#app');
