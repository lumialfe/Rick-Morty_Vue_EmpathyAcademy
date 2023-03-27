<template>
  <div class='main-card'>
    <p class="card-name">{{ episode.name }}</p>
    <p class="card-text">
      <span class="card-text-span">
              Episode: {{ episode.episode }}
      </span>
      <span class="card-text-span">
              AirDate: {{ episode.air_date }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: ['episode']
});
</script>

<style scoped lang="scss">
.main-card {
  background-color: #f8f8f8;
  padding: 2.5vh 1vw;
  display: grid;
  grid-template-areas: "name" "text";
  border-radius: 5px;
  min-height: 25vh;

  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;

  .card-name {
    grid-area: name;
    font-size: 150%;
    font-weight: bold;
  }

  .card-text {
    grid-area: text;
    text-align: left;
    display: flex;
    flex-flow: column nowrap;

    margin: 0;

    .card-text-span {
      text-align: left;
      margin-left: 1vw;
    }
  }
}

@media only screen and (max-width: 640px) {
  .main-card {
    min-height: 0;
    height: 20vh;

    .card-name {
      font-size: 1rem !important;

      .card-text-span {
        margin-left: 3vw;
        font-size: 50%;
      }
    }
  }
}
</style>