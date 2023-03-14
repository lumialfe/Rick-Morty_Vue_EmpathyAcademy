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
        name: '',
        gender: '',
        status: '',
    },
    getters: {
        getResults(state) {
            return state.results;
        },
        getShowingEpisodes(state) {
            return state.isShowingEpisodes;
        },
        getFilters(state) {
            return state.filters;
        },
        getPage(state) {
            return state.page;
        },
        getName(state) {
            return state.name;
        },
        getGender(state) {
            return state.gender;
        },
        getStatus(state) {
            return state.status;
        },
        getQuery(state) {
            let baseURL = 'https://rickandmortyapi.com/api/';
            baseURL += (state.isShowingEpisodes ? 'episode/' : 'character/');
            return baseURL + "?page=" + state.page + // Base URL + Page Number
                (state.name != "" ? ('&name=' + state.name) : "") + // Name, if any
                (!state.isShowingEpisodes ? (state.status != "" ? ("&status=" + state.status) : "") +
                    (state.gender != "" ? ("&gender=" + state.gender) : "") : ""); // If characters, check filters
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
        setName(state, value) {
            state.name = value;
        },
        setGender(state, value) {
            state.gender = value;
        },
        setStatus(state, value) {
            state.status = value;
        }
    }
});


createApp(App).use(store).mount('#app');
