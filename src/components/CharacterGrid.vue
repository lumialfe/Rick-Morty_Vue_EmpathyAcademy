<template>
  <main>
    <CharacterCard v-for="character in characters" v-bind:key="character.id"
                   v-bind:character="character"></CharacterCard>
  </main>
</template>

<script>

import CharacterCard from "@/components/CharacterCard.vue";

export default {
  name: "CharacterGrid",
  components: {CharacterCard},
  props: ["characters"],
}
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-columns: repeat(5, minmax(50px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
}
</style>