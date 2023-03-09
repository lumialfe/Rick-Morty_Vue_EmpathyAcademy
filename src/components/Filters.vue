<!--suppress JSUnresolvedFunction -->
<template>
  <div class="aside__filters">
    <h2>Filters</h2>
    <span>Gender</span>
    <FilterList v-bind:filters="filters.gender" v-slot="slotProps">
      <GenderFilter v-on:clickCheckbox="changeGender(slotProps.filter)">{{ slotProps.filter }}
      </GenderFilter>
    </FilterList>
    <span>Status</span>
    <FilterList v-bind:filters="filters.status" v-slot="slotProps">
      <StatusFilter v-on:clickCheckbox="changeStatus(slotProps.filter)">{{ slotProps.filter }}</StatusFilter>
    </FilterList>
    <button v-on:click="resetAll">Clear Filters</button>
  </div>
</template>

<script>

import FilterList from "@/components/FilterList.vue";
import GenderFilter from "@/components/GenderFilter.vue";
import StatusFilter from "@/components/StatusFilter.vue";

export default {
  components: {StatusFilter, GenderFilter, FilterList},
  props: ['filters'],
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
}
</style>