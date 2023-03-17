import {createStore, Store} from 'vuex';
import {searchModule} from "@/store/search.module";
import {resultsModule} from "@/store/results.module";

export const store:Store<any> = createStore({
    modules: {
        search: searchModule,
        results: resultsModule,
    },
});