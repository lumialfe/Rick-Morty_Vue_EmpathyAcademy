<template>
  <input type="radio" v-on:change="$emit('clickCheckbox',$event)" name="status-filter"/>
  <label>
    <slot></slot>
  </label>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>