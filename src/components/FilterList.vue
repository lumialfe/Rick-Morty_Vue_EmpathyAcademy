<template>
  <ul class="filters">
    <li v-for="filter in filters" v-bind:key="filter">
      <slot :filter="filter"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: ['filters']
});
</script>

<style scoped lang="scss">
.filters {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>