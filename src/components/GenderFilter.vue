<template>
  <input type="radio" v-on:change="$emit('clickCheckbox',$event)" name="gender-filter"/>
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