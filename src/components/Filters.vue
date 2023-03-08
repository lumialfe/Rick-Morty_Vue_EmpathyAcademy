<template>
  <div class="aside__filters">
    <h2>Filters</h2>
    <span>Gender</span>
    <FilterList v-bind:filters="filters.gender" v-slot="slotProps">
      <GenderFilter v-on:click="changeGender(slotProps.filter)">{{ slotProps.filter }}
      </GenderFilter>
    </FilterList>
  </div>
</template>

<script>

import FilterList from "@/components/FilterList.vue";
import GenderFilter from "@/components/GenderFilter.vue";

export default {
  components: {GenderFilter, FilterList},
  props: ['filters'],
}
</script>

<style scoped>
.aside__filters {
  text-align: center;
}
</style>