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
.header-searchbar {
  width: 40vw;
  border-radius: 500px;
  height: auto;
  padding: 1rem 2rem;
  border: none;
  text-align: right;
  background: white url("../assets/media/search-icon.svg") no-repeat 15px center;
  background-size: 1rem;
  font-family: "Montserrat", sans-serif;
}
</style>