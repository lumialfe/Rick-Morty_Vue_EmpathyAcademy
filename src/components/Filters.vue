<!--suppress JSUnresolvedFunction -->
<template>
  <div class="aside__filters">
    <div v-if="!$parent.isShowingEpisodes">
      <span class="aside__filters-title">Gender</span>
      <FilterList v-bind:filters="filters.gender" v-slot="slotProps">
        <GenderFilter v-on:clickCheckbox="changeGender(slotProps.filter)">{{ slotProps.filter }}
        </GenderFilter>
      </FilterList>
      <span class="aside__filters-title">Status</span>
      <FilterList v-bind:filters="filters.status" v-slot="slotProps">
        <StatusFilter v-on:clickCheckbox="changeStatus(slotProps.filter)">{{ slotProps.filter }}</StatusFilter>
      </FilterList>
    </div>
    <h2>Filters</h2>

    <button class="aside__filters-button" v-on:click="resetAll">Clear Search</button>
    <button id="changeModeButton" v-on:click="this.$parent.changeMode">{{ buttonText }}</button>
  </div>
</template>

<script>

import FilterList from "@/components/FilterList.vue";
import GenderFilter from "@/components/GenderFilter.vue";
import StatusFilter from "@/components/StatusFilter.vue";

export default {
  components: {StatusFilter, GenderFilter, FilterList},
  props: ['filters'],
  computed: {
    buttonText() {
      return "Show " + (this.$store.getters["getShowingEpisodes"] ? "Characters" : "Episodes");
    }
  },
  methods: {
    resetAll() {
      location.reload();
    },
    changeStatus(checkboxValue) {
      this.$parent.changeStatus(checkboxValue);
    },
    changeGender(checkboxValue) {
      this.$parent.changeGender(checkboxValue);
    }
  }
}
</script>

<style scoped>
.aside__filters {
  text-align: center;
  padding-top: 3vh;
  font-size: 90%;
}

.aside__filters-title {
  font-size: 125%;
  font-weight: bold;
}

@media only screen and (max-width: 640px) {
  h2 {
    display: none;
  }
}
</style>