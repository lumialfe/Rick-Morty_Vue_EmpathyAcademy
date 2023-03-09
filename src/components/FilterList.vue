<template>
  <ul class="filters">
    <li v-for="filter in filters" v-bind:key="filter">
      <slot :filter="filter"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['filters']
};
</script>

<style scoped lang="scss">
.filters {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>