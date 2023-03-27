<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <div class="aside__filters">
    <h2>Filters</h2>
    <div v-if="!$parent.isShowingEpisodes">
      <span class="aside__filters-title">Status</span>
      <FilterList v-bind:filters="filters.status" v-slot="slotProps">
        <StatusFilter v-on:clickCheckbox="changeStatus(slotProps.filter)">{{ slotProps.filter }}</StatusFilter>
      </FilterList>
      <span class="aside__filters-title">Gender</span>
      <FilterList v-bind:filters="filters.gender" v-slot="slotProps">
        <GenderFilter v-on:clickCheckbox="changeGender(slotProps.filter)">{{ slotProps.filter }}
        </GenderFilter>
      </FilterList>
      <div id="columnSlider">
        <span class="aside__filters-title">Columns</span>
        <input type="range" min="3" max="7" value="5" class="aside__filters-columnSlider"
               v-on:input="changeColumns($event.target.value)">
      </div>
    </div>
    <button class="aside__filters-button" v-on:click="resetAll">Clear Search</button>
    <button id="changeModeButton" v-on:click="this.$parent.changeMode">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">

import FilterList from "@/components/FilterList.vue";
import GenderFilter from "@/components/GenderFilter.vue";
import StatusFilter from "@/components/StatusFilter.vue";
import {defineComponent} from "vue";
import {store} from "@/store/store";

export default defineComponent({
  components: {StatusFilter, GenderFilter, FilterList},
  props: ['filters', 'parent'],
  computed: {
    buttonText() {
      return "Show " + (store.getters["getShowingEpisodes"] ? "Characters" : "Episodes");
    }
  },
  methods: {
    resetAll() {
      location.reload();
    },
    changeStatus(checkboxValue: string) {
      this.parent.changeStatus(checkboxValue);
    },
    changeGender(checkboxValue: string) {
      this.parent.changeGender(checkboxValue);
    },
    changeColumns(value: string) {
      document.documentElement.style.setProperty("--numberOfColumns", value);
    }
  }
});
</script>

<style lang="scss">

.aside__filters {
  text-align: center;
  padding-top: 3vh;
  font-size: 90%;

  .aside__filters-title {
    font-size: 125%;
    font-weight: bold;
  }

  .aside__filters-columnSlider {
    width: 90%;
    margin: auto;
  }
}

@media only screen and (max-width: 640px) {
  h2 {
    display: none;
  }
}
</style>