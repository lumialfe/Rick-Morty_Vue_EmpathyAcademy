import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import './assets/styles/style.css';

const store = createStore({
    state: {
        results: [],
        isShowingEpisodes: false,
        filters: {
            status: ['Alive', 'Dead', 'Unknown'],
            gender: ['Male', 'Female', 'Unknown']
        },
        page: 1,
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
        },
        getFilters(state) {
            return state.filters;
        },
        getPage(state) {
            return state.page;
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
        },
        increasePage(state) {
            state.page++;
        },
        resetPage(state) {
            state.page = 1;
        },
    }
});


createApp(App).use(store).mount('#app');
