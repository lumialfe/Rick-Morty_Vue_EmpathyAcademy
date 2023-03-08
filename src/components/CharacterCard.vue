<template>
<!--  let img = "<img class='card-image' loading='lazy' src='" + character.image + "' alt='" + character.name + "'/>"
  let name = "<p class='card-name'>" + character.name + "</p>"
  let description = "<p class='card-text'>Gender: " + character.gender + "<br/>"
  + "Status: " + character.status + "</br>"
  + "</p>"


  let tooltip = "<p class='card-extradesc'>" + "Species: " + character.species + "<br/>"
  + "Origin: " + character.origin.name + "<br/>"
  + "</p>"
  return "<div class='main-card'>" + img + name + description + tooltip + "</div>"-->

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
    padding: 2vh 1vw;
    background-color: white;
    justify-content: center;
    display: grid;
    grid-template-areas: "image" "name" "text";
    border-radius: 25px; }

  .card-image {
    grid-area: image;
    width: 100%;
    border-radius: 25px;
    margin-top: 1vh; }

  .card-name {
    grid-area: name;
    font-size: 150%; }

  .card-text {
    grid-area: text; }
</style>