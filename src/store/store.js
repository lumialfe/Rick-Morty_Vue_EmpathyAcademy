import { searchModule } from '@/store/search.module';
import { resultsModule } from '@/store/results.module';
import { createStore } from 'vuex';

export const store = createStore({
    modules: {
        search: searchModule,
        results: resultsModule,
    },
});