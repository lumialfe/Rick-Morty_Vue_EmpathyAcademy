<template>
  <header>
    <a href="index.html"><img class="logo" src="./assets/media/logo.png" alt="Page Logo."/></a>
    <SearchBar v-on:search="setCharacter"/>
  </header>
  <div class="body-mobilefilters">
    <button class="mobilefilters-button" v-on:click="changeMobileFilterVisibility">
      Filter
    </button>
    <Filters id="mobilefilters-component" v-bind:filters="filters"></Filters>
  </div>
  <div class="body-main">
    <aside>
      <Filters v-bind:filters="filters"></Filters>
    </aside>
    <span class="body-main-noresults" v-if="characters.length == 0">Oops! Nothing to see here.<br/> Please try again.</span>
    <main v-else>
      <CharacterCard v-for="character in characters" v-bind:key="character.id" v-bind:character="character" />
    </main>
  </div>
</template>

<!--suppress JSDeprecatedSymbols -->
<script>
import SearchBar from "@/components/SearchBar.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import Filters from "@/components/Filters.vue";

export default {
  components: {
    Filters,
    CharacterCard,
    SearchBar,
  },
  data() {
    return {
      name: '',
      gender: '',
      status: '',
      characters: [],
      url: 'https://rickandmortyapi.com/api/character/',
      page: 1,
      hasNext: false,
      filters: {
        status: ['Alive', 'Dead', 'Unknown'],
        gender: ['Male', 'Female', 'Unknown']
      },
      isVisibleMobileFilters: false,
    }
  },
  watch: {
    name() {
      this.debounce(this.searchCharacters(), 500);
    },
    status() {
      this.searchCharacters();
    },
    gender() {
      this.searchCharacters();
    },
  },
  methods: {
    setCharacter(character) {
      this.name = character;
    },
    searchCharacters() {
      fetch(this.url  + "?page=" + this.page +
            (this.name != "" ? ('&name=' + this.name) : "") +
            (this.status != "" ? ("&status=" + this.status) : "") +
            (this.gender != "" ? ("&gender=" + this.gender) : ""))
          .then(response => response.json()).then(data => {
            this.hasNext = data.info.next != null;
            this.characters = data.results;
          })
          .catch(ex => {
            console.log(ex);
            this.characters = [];
          });
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow && this.hasNext) {
          this.loadMore();
        }
      }
    },
    loadMore() {
      this.page += 1;
      fetch(this.url  + "?page=" + this.page +
          (this.name != "" ? ('&name=' + this.name) : "") +
          (this.status != "" ? ("&status=" + this.status) : "") +
          (this.gender != "" ? ("&gender=" + this.gender) : ""))
          .then(response => response.json()).then(data => {
            this.hasNext = data.info.next;
            for (let i = 20 * this.page - 20; i < 20 * this.page; i++) {
              this.characters[i] = data.results[i - 20 * (this.page - 1)];
            }
          })
          .catch(ex => {
            console.log(ex);
            this.characters = [];
          });
    },
    debounce(func, delay) {
      let debounceTimer
      return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
      }
    },
    changeStatus(checkboxValue) {
      if (this.status === checkboxValue) {
        this.status = '';
      } else {
        this.status = checkboxValue;
      }
    },
    changeGender(checkboxValue) {
      if (this.gender === checkboxValue) {
        this.gender = '';
      } else {
        this.gender = checkboxValue;
      }
    },
    changeMobileFilterVisibility() {
      document.getElementById("mobilefilters-component").style.display = this.isVisibleMobileFilters ? "none" : "block";
      this.isVisibleMobileFilters = !this.isVisibleMobileFilters;
    }
  },
  created() {
    this.searchCharacters();
  },
  mounted() {
    this.scroll();
  }
}
</script>

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


  .body-mobilefilters {
    display: none;
  }

  #mobilefilters-component {
    display: none;
  }

  .body-main-noresults {
    text-align: center;
    font-weight: bold;
    font-size: 200%;
  }

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

    .body-mobilefilters {
      display: block;
    }
  }
</style>
