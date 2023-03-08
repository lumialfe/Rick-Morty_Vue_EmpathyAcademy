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
  </div>
</template>

<script>
export default {
  props: ['character']
};
</script>

<style scoped>

</style>