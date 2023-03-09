<template>
  <input class="filter-input" type="radio" v-on:change="$emit('clickCheckbox',$event)" name="status-filter"/>
  <label>
    <slot></slot>
  </label>
</template>

<script>
export default {
}
</script>

<style scoped>
.filter-input:checked+label {

}
</style>