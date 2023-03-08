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
    this.searchCharacters();
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
    align-items: center; }

  .logo {
    width: 8rem; }

  .body-main {
    grid-area: bodymain;
    display: grid;
    grid-template-columns: 10% auto;
    grid-column-gap: 1vw;
    grid-row-gap: 1vw;
    padding: 2vh 1vw; }

  aside {
    text-align: left;
    background-color: #efdfd4;
    padding: 1vh 1vw;
    border-radius: 25px;
    height: fit-content; }

  main {
    display: grid;
    grid-template-columns: repeat(5, minmax(50px, 1fr));
    grid-row-gap: 2vh;
    grid-column-gap: 1vw; }


  @media only screen and (max-width: 640px) {
    main {
      grid-template-columns: repeat(2, minmax(50px, 1fr));
      grid-column-gap: 2vw;
      grid-row-gap: 1vh; }

    .body-main {
      grid-template-columns: 100%; }

    aside {
      display: none; }

    body {
      grid-template-rows: 1fr auto auto;
      grid-template-areas: "header" "mobilefilters" "bodymain"; }

    .header-dropdown {
      grid-area: mobilefilters;
      display: block; }

    .body-mobile-filters {
      display: none; }

    .card-image {
      max-width: 90%;
      margin: 0px auto auto; } }
</style>
