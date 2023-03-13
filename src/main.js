import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import './assets/styles/style.css';

const store = createStore({
    state: {
        results: [],
        isShowingEpisodes: false,
    },
    getters: {
        getResults(state) {
            return state.results;
        },
        getShowingEpisodes(state) {
            return state.isShowingEpisodes;
        },
        getUrl(state) {
            let baseURL = 'https://rickandmortyapi.com/api/';
            return baseURL + (state.isShowingEpisodes ? 'episode/' : 'character/');
        }
    },
    mutations: {
        setResults(state, value) {
            state.results = value;
        },
        addResult(state, value) {
            state.results.push(value);
        },
        setShowingEpisodes(state, value) {
            state.isShowingEpisodes = value;
        }
    }
});


createApp(App).use(store).mount('#app');
