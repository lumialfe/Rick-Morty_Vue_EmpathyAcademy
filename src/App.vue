<!--suppress ALL, CssUnusedSymbol -->
<template>
  <header>
    <a href="index.html"><img class="logo" src="./assets/media/logo.png" alt="Page Logo."/></a>
    <SearchBar v-on:search="changeName"/>
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
      filters: {
        status: ['Alive', 'Dead', 'Unknown'],
        gender: ['Male', 'Female', 'Unknown']
      },
      isVisibleMobileFilters: false,
      isVisibleScrollTop: false,
    }
  },
  computed: {
    results() {
      return this.$store.getters['results/getResults'];
    },
    isShowingEpisodes() {
      return this.$store.getters["search/getShowingEpisodes"];
    },
    page() {
      return this.$store.getters["search/getPage"];
    },
    query() {
      return this.$store.getters["search/getQuery"];
    },
  },
  methods: {
    changeMode() {
      this.$store.commit("search/setShowingEpisodes", !this.isShowingEpisodes);
      this.$store.commit("results/setResults", []);
      this.$store.dispatch("results/search");
    },
    scroll() {
      window.onscroll = () => {
        let isBottomOfWindowReached = (window.innerHeight + Math.ceil(window.pageYOffset)) >=
            document.body.offsetHeight - 50;
        if (isBottomOfWindowReached) {
          if (this.$store.getters["results/getHasNext"]) {
            this.$store.commit("search/increasePage");
            this.$store.dispatch("results/loadMore");
          }
        }
        this.isVisibleScrollTop = window.scrollY > 400;
      }
    },
    changeName(character) {
      this.$store.commit("search/setName", character);
      this.$store.dispatch("results/search");
    },
    changeStatus(checkboxValue) {
      this.$store.commit("search/setStatus", checkboxValue);
      this.$store.dispatch("results/search");
    },
    changeGender(checkboxValue) {
      this.$store.commit("search/setGender", checkboxValue);
      this.$store.dispatch("results/search");
    },
    changeMobileFilterVisibility() {
      document.getElementById("mobilefilters-component").style.display = this.isVisibleMobileFilters ? "none" : "block";
      this.isVisibleMobileFilters = !this.isVisibleMobileFilters;
    },
  },
  created() {
    this.$store.dispatch("results/search");
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
