<template>
  <div class='main-card'>
    <img class='card-image' loading='lazy' v-bind:src="character.image" v-bind:alt="character.name"/>
    <p class="card-name">{{character.name}}</p>
    <p class="card-text">
      Status: {{character.status}}
      <br/>
      Gender: {{character.gender}}
      <br/>
      Species: {{character.species}}
      <br/>
      Origin: {{character.origin.name}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['character']
};
</script>

<style scoped>
  .main-card {
    background-color: white;
    padding: 2.5vh 1vw;
    display: grid;
    grid-template-areas: "image" "name" "text";
    border-radius: 25px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  .card-image {
    grid-area: image;
    width: 100%;
    border-radius: 25px;
  }

  .card-name {
    grid-area: name;
    font-size: 200%;
    font-weight: bold;
  }

  .card-text {
    grid-area: text;
    text-align: left;
    padding-left: 1vw;
  }
</style>