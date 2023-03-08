<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar

  },
  data() {
    return {
      character: '',
      characters: [],
      url: 'https://rickandmortyapi.com/api/character/',
    }
  },
  watch: {
    character() {
      this.searchCharacters();
    }
  },
  methods: {
    setCharacter(character) {
      this.character = character;
    },
    searchCharacters() {
      fetch(this.url + '?name=' + this.character).then(response => response.json())
          .then(data => {
            this.characters = data.results;
            console.log(this.characters);
          });
    },
  },
  created() {

  },
  mounted() {

  }
}
</script>

<template>
  <header>
    <a href="index.html"><img class="logo" src="./assets/media/logo.png" alt="Page Logo."/></a>
    <SearchBar v-on:search="setCharacter"/>
  </header>
  <div class="body-main">
    <aside>

    </aside>
    <main>

    </main>
  </div>
</template>

<style scoped>

</style>
