<template>
  <label for="searchBar"></label>
  <input id="searchBar" class="header-searchbar" type="text" placeholder="Search..."
         onfocus="this.placeholder=''" onblur="this.placeholder='Search...'"
          v-on:input="$emit('search',$event.target.value)"/>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style scoped lang="scss">
.header-searchbar {
  width: 4rem;
  height: auto;
  padding: 1rem 2rem;
  border: none;
  border-bottom: 2px solid black;
  text-align: right;
  background: url("../assets/media/search-icon.svg") no-repeat 15px center;
  background-size: 1rem;
  font-family: "Montserrat", sans-serif;
  transition: width .5s ease-in-out;
}

*:focus {
  outline: none;
  transition: width .5s ease-in-out;
  width: 15vw;
}

@media only screen and (max-width: 640px) {
  .header-searchbar {
    width: 35%;
  }
  *:focus {
    outline: none;
    transition: width .5s ease-in-out;
    width: 35%;
  }
}
</style>