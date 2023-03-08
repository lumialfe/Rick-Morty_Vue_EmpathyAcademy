<script>
import SearchBar from "@/components/SearchBar.vue";
import CharacterCard from "@/components/CharacterCard.vue";

export default {
  components: {
    CharacterCard,
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
      <CharacterCard v-for="character in characters" v-bind:key="character.id" v-bind:character="character" />
    </main>
  </div>
</template>

<style scoped>
  header {
    grid-area: header;
    background-color: #efdfd4;
    padding: 0 2vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    width: 8rem;
  }
</style>
