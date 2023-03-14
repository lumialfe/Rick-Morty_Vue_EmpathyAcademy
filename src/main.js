import {createApp} from 'vue';
import {createStore} from 'vuex';
import App from './App.vue';

import './assets/styles/style.css';

const store = createStore({
    state: {
        results: [], isShowingEpisodes: false, filters: {
            status: ['Alive', 'Dead', 'Unknown'], gender: ['Male', 'Female', 'Unknown']
        }, page: 1, name: '', gender: '', status: '', hasNext: false,
    }, getters: {
        getResults(state) {
            return state.results;
        }, getShowingEpisodes(state) {
            return state.isShowingEpisodes;
        }, getFilters(state) {
            return state.filters;
        }, getPage(state) {
            return state.page;
        }, getName(state) {
            return state.name;
        }, getGender(state) {
            return state.gender;
        }, getStatus(state) {
            return state.status;
        }, getQuery(state) {
            let baseURL = 'https://rickandmortyapi.com/api/';
            baseURL += (state.isShowingEpisodes ? 'episode/' : 'character/'); // Check if characters or episodes
            return baseURL + "?page=" + state.page + // Base URL + Page Number
                (state.name != "" ? ('&name=' + state.name) : "") + // Name, if any
                (!state.isShowingEpisodes ? (state.status != "" ? ("&status=" + state.status) : "") + (state.gender != "" ? ("&gender=" + state.gender) : "") : ""); // If characters, check filters
        }, getHasNext(state) {
            return state.hasNext;
        }
    }, actions: {
        async search({commit, getters}) {
            commit("resetPage");

            fetch(getters["getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null);
                commit("setResults", data.results);
            })
                .catch(ex => {
                    console.log(ex);
                    commit("setResults", []);
                });
        }, async loadMore({commit, getters}) {
            fetch(getters["getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null);
                let page = getters["getPage"];
                for (let i = 20 * page - 20; i < 20 * page; i++) {
                    commit("addResult", data.results[i - 20 * (page - 1)]);
                }
            })
                .catch(ex => {
                    console.log(ex);
                });
        },
    }, mutations: {
        setResults(state, value) {
            state.results = value;
        }, addResult(state, value) {
            state.results.push(value);
        }, setShowingEpisodes(state, value) {
            state.isShowingEpisodes = value;
        }, increasePage(state) {
            state.page++;
        }, resetPage(state) {
            state.page = 1;
        }, setName(state, value) {
            state.name = value;
        }, setGender(state, value) {
            state.gender = value;
        }, setStatus(state, value) {
            state.status = value;
        }, setHasNext(state, value) {
            state.hasNext = value;
        }
    }
});


createApp(App).use(store).mount('#app');
