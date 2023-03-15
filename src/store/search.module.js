export const searchModule = {
    namespaced: true,
    state: {
        page: 1,
        name: '',
        gender: '',
        status: '',
        isShowingEpisodes: false,
    },
    getters: {
        getPage(state) {
            return state.page;
        }, getShowingEpisodes(state) {
            return state.isShowingEpisodes;
        }, getQuery(state) {
            let baseURL = 'https://rickandmortyapi.com/api/';
            baseURL += (state.isShowingEpisodes ? 'episode/' : 'character/'); // Check if characters or episodes
            return baseURL + "?page=" + state.page + // Base URL + Page Number
                (state.name != "" ? ('&name=' + state.name) : "") + // Name, if any
                (!state.isShowingEpisodes ? (state.status != "" ? ("&status=" + state.status) : "") + (state.gender != "" ? ("&gender=" + state.gender) : "") : ""); // If characters, check filters
        },
    },
    mutations: {
        increasePage(state) {
            state.page++;
        }, resetPage(state) {
            state.page = 1;
        }, setName(state, value) {
            state.name = value;
        }, setGender(state, value) {
            state.gender = value;
        }, setStatus(state, value) {
            state.status = value;
        }, setShowingEpisodes(state, value) {
            state.isShowingEpisodes = value;
        },
    },
}