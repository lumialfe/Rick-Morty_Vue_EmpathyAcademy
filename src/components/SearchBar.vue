<template>
  <label for="searchBar"></label>
  <input id="searchBar" class="header-searchbar" type="text" placeholder="Find a Character..." v-on:input="$emit('search',$event.target.value)"/>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style scoped>

</style>