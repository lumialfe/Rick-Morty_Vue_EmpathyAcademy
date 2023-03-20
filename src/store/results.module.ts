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
        results: [],
        hasNext: false,
    },
    actions: {
        async search({commit, rootGetters}) {
            commit("results/resetPage", null, {root: true});

            fetch(rootGetters["search/getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null);
                commit("setResults", data.results);
            })
                .catch(ex => {
                    console.log(ex);
                    commit("setResults", []);
                });
        }, async loadMore({commit, rootGetters}) {
            fetch(rootGetters["search/getQuery"])
                .then(response => response.json()).then(data => {
                commit("setHasNext", data.info.next != null);
                let page = rootGetters["search/getPage"];
                for (let i = 20 * page - 20; i < 20 * page; i++) {
                    commit("addResult", data.results[i - 20 * (page - 1)]);
                }
            })
                .catch(ex => {
                    console.log(ex);
                });
        },
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