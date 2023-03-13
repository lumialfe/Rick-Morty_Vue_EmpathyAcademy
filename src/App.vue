<!--suppress ALL, CssUnusedSymbol -->
<template>
  <header>
    <a href="index.html"><img class="logo" src="./assets/media/logo.png" alt="Page Logo."/></a>
    <button v-on:click="changeMode">Show Episodes</button>
    <SearchBar v-on:search="setCharacter"/>
  </header>
  <div class="body-mobilefilters">
    <button class="mobilefilters-button" v-on:click="changeMobileFilterVisibility">
      Filters
    </button>
    <Filters id="mobilefilters-component" v-bind:filters="filters"></Filters>
  </div>
  <div class="body-main">
    <aside>
      <Filters v-bind:filters="filters"></Filters>
      <ScrollTopButton v-if="isVisibleScrollTop"></ScrollTopButton>
    </aside>
    <span class="body-main-noresults"
          v-if="results.length == 0">Oops! Nothing to see here. <br/> Please try again.</span>
    <CharacterGrid>
      <TransitionGroup v-if="!isShowingEpisodes" name="list">
        <CharacterCard v-for="character in results" v-bind:key="character.id"
                       v-bind:character="character"></CharacterCard>
      </TransitionGroup>
      <TransitionGroup v-if="isShowingEpisodes" name="list">
        <EpisodeCard v-for="episode in results" v-bind:key="episode.id"
                     v-bind:episode="episode"></EpisodeCard>
      </TransitionGroup>
    </CharacterGrid>
  </div>
</template>

<!--suppress JSDeprecatedSymbols -->
<script>
import SearchBar from "@/components/SearchBar.vue";
import Filters from "@/components/Filters.vue";
import CharacterGrid from "@/components/CardGrid.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import EpisodeCard from "@/components/EpisodeCard.vue";

export default {
  components: {
    EpisodeCard,
    CharacterCard,
    CharacterGrid,
    ScrollTopButton,
    Filters,
    SearchBar,
  },
  data() {
    return {
      name: '',
      gender: '',
      status: '',
      results: [],
      url: 'https://rickandmortyapi.com/api/character/',
      page: 1,
      hasNext: false,
      filters: {
        status: ['Alive', 'Dead', 'Unknown'],
        gender: ['Male', 'Female', 'Unknown']
      },
      isVisibleMobileFilters: false,
      isVisibleScrollTop: false,
      isShowingEpisodes: false,
    }
  },
  watch: {
    name() {
      if (!this.isShowingEpisodes) {
        this.debounce(this.searchCharacters(), 500);
      } else {
        this.debounce(this.searchEpisodes(), 500);
      }
    },
    status() {
      this.searchCharacters();
    },
    gender() {
      this.searchCharacters();
    },
  },
  methods: {
    changeMode() {
      this.isShowingEpisodes = !this.isShowingEpisodes;
      this.page = 1;
      this.results = [];
      if (this.isShowingEpisodes) {
        this.searchEpisodes();
      } else {
        this.searchCharacters();
      }
    },
    setCharacter(character) {
      this.name = character;
    },
    searchCharacters() {
      fetch(this.url + "?page=" + this.page +
          (this.name != "" ? ('&name=' + this.name) : "") +
          (this.status != "" ? ("&status=" + this.status) : "") +
          (this.gender != "" ? ("&gender=" + this.gender) : ""))
          .then(response => response.json()).then(data => {
        this.hasNext = data.info.next != null;
        this.results = data.results;
      })
          .catch(ex => {
            console.log(ex);
            this.results = [];
          });
    },
    searchEpisodes() {

      let url = 'https://rickandmortyapi.com/api/episode/';
      fetch(url + "?page=" + this.page +
          (this.name != "" ? ('&name=' + this.name) : ""))
          .then(response => response.json())
          .then(data => {
            this.hasNext = data.info.next != null;
            this.results = data.results;
          })
          .catch(ex => {
            console.log(ex);
            this.results = [];
          });
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 50;
        if (bottomOfWindow) {
          if (this.hasNext) {
            if (!this.isShowingEpisodes) {
              this.loadMoreCharacters();
            } else {
              this.loadMoreEpisodes();
            }
          }
        }
        if (window.scrollY < 400) {
          this.isVisibleScrollTop = false;
        } else {
          this.isVisibleScrollTop = true;
        }
      }
    },
    loadMoreCharacters() {
      this.page += 1;
      fetch(this.url + "?page=" + this.page +
          (this.name != "" ? ('&name=' + this.name) : "") +
          (this.status != "" ? ("&status=" + this.status) : "") +
          (this.gender != "" ? ("&gender=" + this.gender) : ""))
          .then(response => response.json()).then(data => {
        this.hasNext = data.info.next;
        for (let i = 20 * this.page - 20; i < 20 * this.page; i++) {
          this.results[i] = data.results[i - 20 * (this.page - 1)];
        }
      })
          .catch(ex => {
            console.log(ex);
            this.results = [];
          });
    },
    loadMoreEpisodes() {
      this.page += 1;
      fetch(this.url + "?page=" + this.page +
          (this.name != "" ? ('&name=' + this.name) : ""))
          .then(response => response.json())
          .then(data => {
            this.hasNext = data.info.next;
            for (let i = 20 * this.page - 20; i < 20 * this.page; i++) {
              this.results[i] = data.results[i - 20 * (this.page - 1)];
            }
          })
          .catch(ex => {
            console.log(ex);
            this.results = [];
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
    },
  },
  created() {
    this.searchCharacters();
  },
  mounted() {
    this.scroll();
  }
}
</script>

<style lang="scss">

.list-enter-active,
.list-leave-active {
  transition: all .5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}


header {
  grid-area: header;
  padding: 0 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 8rem;
  }
}

.body-mobilefilters {
  display: none;

  #mobilefilters-component {
    display: none;
  }
}

.body-main {
  grid-area: bodymain;
  display: grid;
  grid-template-columns: 10% auto;
  grid-column-gap: 1vw;
  grid-row-gap: 1vw;
  padding: 2vh 1vw;

  aside {
    text-align: left;
    padding: 1vh 1vw;
    height: fit-content;
    border-right: 2px solid black;
  }

  .body-main-noresults {
    text-align: center;
    font-weight: bold;
    font-size: 200%;
  }
}

@media only screen and (max-width: 640px) {
  body {
    grid-template-rows: 1fr auto auto;
    grid-template-areas: "header" "mobilefilters" "bodymain";

    .body-mobilefilters {
      display: block;
      margin: auto;
      width: 80%;
    }

    .mobilefilters-button {
      width: 50%;
    }

    .body-main {
      grid-template-columns: 100%;

      main {
        grid-template-columns: repeat(2, minmax(50px, 1fr));
        grid-column-gap: 2vw;
        grid-row-gap: 1vh;
      }
    }

    aside {
      display: none;
    }
  }
}
</style>
