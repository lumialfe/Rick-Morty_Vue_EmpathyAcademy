<template>
  <label for="searchBar"></label>
  <input id="searchBar" class="header-searchbar" type="text" placeholder="Find a Character..." v-on:input="$emit('search',$event.target.value)"/>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style scoped lang="scss">
.header-searchbar {
  width: 40vw;
  height: auto;
  padding: 1rem 2rem;
  border: none;
  border-bottom: 2px solid black;
  text-align: right;
  background: url("../assets/media/search-icon.svg") no-repeat 15px center;
  background-size: 1rem;
  font-family: "Montserrat", sans-serif;
}
</style>