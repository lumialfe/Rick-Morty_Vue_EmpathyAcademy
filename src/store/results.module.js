export const resultsModule = {
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
        getResults(state) {
            return state.results;
        }, getHasNext(state) {
            return state.hasNext;
        }
    },
    mutations: {
        setResults(state, value) {
            state.results = value;
        }, addResult(state, value) {
            state.results.push(value);
        }, setHasNext(state, value) {
            state.hasNext = value;
        }
    },
}