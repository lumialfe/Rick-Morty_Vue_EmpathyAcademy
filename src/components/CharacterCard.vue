<template>
  <div class='main-card'>
    <img class='card-image' loading='lazy' v-bind:src="character.image" v-bind:alt="character.name"/>
    <p class="card-name">{{ character.name }}</p>
    <p class="card-text">
      <span class="card-text-span">
        Status: <span
          :class="(character.status == 'Alive' ? 'alive' : (character.status == 'Dead' ? 'dead' : 'unknown') )">{{
          character.status
        }}</span>
      </span>
      <span class="card-text-span">
              Gender: {{ character.gender }}
      </span>
      <span class="card-text-span">
              Species: {{ character.species }}
      </span>
      <span class="card-text-span">
              Origin: {{ character.origin.name }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: ['character'],
});
</script>

<style scoped lang="scss">
.alive {
  color: green;
}

.main-card {
  background-color: #f8f8f8;
  padding: 6.9%;
  display: grid;
  grid-template-areas: "image" "name" "text";
  border-radius: 5px;
  overflow-wrap: break-word;

  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;

  .card-image {
    grid-area: image;
    width: 100%;
    border-radius: 5px;
  }

  .card-name {
    grid-area: name;
    font-size: 130%;
    font-weight: bold;
    word-wrap: break-word;

    margin: 1vw;
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

      .alive {
        color: green;
      }

      .dead {
        color: red;
      }

      .unknown {
        color: #949494;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .card-image {
    max-width: 80%;
    margin: 0 auto auto;
  }

  .card-name {
    font-size: 1rem !important;

    .card-text-span {
      margin-left: 3vw;
      font-size: 50%;
    }
  }


}
</style>