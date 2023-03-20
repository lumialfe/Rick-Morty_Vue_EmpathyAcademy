import {Commit, Dispatch, Module, Store} from "vuex";
interface State {
    gender: string,
    status: string,
    name: string,
    page: number,
    isShowingEpisodes: boolean,
}
interface ComponentCustomProperties {
    $store: Store<State>|Store<Commit>|Store<Dispatch>
}

export const searchModule:Module<State, ComponentCustomProperties> = {
    namespaced: true,
    state: {
        page: 1, // Current page number of the search.
        name: '', // Text input in the search bar, if any.
        gender: '', // Gender filter chosen, if any.
        status: '', // Status filter chosen, if any.
        isShowingEpisodes: false, // Is the app showing episodes or characters?
    },
    getters: {
        getPage(state:State):number {
            return state.page;
        }, getShowingEpisodes(state:State):boolean {
            return state.isShowingEpisodes;
        }, getQuery(state:State):string {
            return 'https://rickandmortyapi.com/api/' + // Base URL
                    (state.isShowingEpisodes ? 'episode/' : 'character/') + // Check if characters or episodes
                    "?page=" + state.page + // Base URL + Page Number
                    (state.name != "" ? ('&name=' + state.name) : "") + // Name, if any
                    (!state.isShowingEpisodes ? (state.status != "" ? ("&status=" + state.status) : "") + (state.gender != "" ? ("&gender=" + state.gender) : "") : ""); // If characters, check filters
        },
    },
    mutations: {
        increasePage(state:State) {
            state.page++;
        }, resetPage(state:State) {
            state.page = 1;
        }, setName(state:State, value:string) {
            state.name = value;
        }, setGender(state:State, value:string) {
            state.gender = value;
        }, setStatus(state:State, value:string) {
            state.status = value;
        }, setShowingEpisodes(state:State, value:boolean) {
            state.isShowingEpisodes = value;
        },
    },
}