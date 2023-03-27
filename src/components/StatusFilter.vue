<template>
  <input type="radio" v-on:change="$emit('clickCheckbox',$event)" name="status-filter"/>
  <label>
    <slot></slot>
  </label>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({});
</script>

<style scoped lang="scss">
</style>