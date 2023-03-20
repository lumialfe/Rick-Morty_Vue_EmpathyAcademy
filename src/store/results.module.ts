import {Commit, Dispatch, Module, Store} from "vuex";

interface State {
    results : string[],
    hasNext: boolean,
}

interface ComponentCustomProperties {
    $store: Store<State>|Store<Commit>|Store<Dispatch>
}

export const resultsModule:Module<State, ComponentCustomProperties> = {
    namespaced: true,
    state: {
        results: [], // Array containing the different results returned by the api.
        hasNext: false, // Checks if current search has more results to show.
    },
    actions: {
        async search({commit, rootGetters}) {
            commit("results/resetPage", null, {root: true}); // With a new search we reset the current page number to 1.

            fetch(rootGetters["search/getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null); // Check if the search has more pages.
                commit("setResults", data.results); // We overwrite the previous results with the new ones.
            })
                .catch(ex => {
                    console.log(ex); // Log Exception on console.
                    commit("setResults", []); // Reset results array to show "No Results" page
                });
        }, async loadMore({commit, rootGetters}) {
            fetch(rootGetters["search/getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null); // Check if the search has more pages.
                let page = rootGetters["search/getPage"]; // Get current page
                for (let i = 20 * page - 20; i < 20 * page; i++) { // 20 is the number of results per page.
                    commit("addResult", data.results[i - 20 * (page - 1)]); // We append results to the ones already showing.
                }
            })
                .catch(ex => {
                    console.log(ex); // Log Exception on console.
                });
        },
        //TODO sort by name functionality
    },
    getters: {
        getResults(state:State):string[] {
            return state.results;
        }, getHasNext(state:State):boolean {
            return state.hasNext;
        }
    },
    mutations: {
        setResults(state:State, value:string[]) {
            state.results = value;
        }, addResult(state:State, value:string) {
            state.results.push(value);
        }, setHasNext(state:State, value:boolean) {
            state.hasNext = value;
        }
    },
}