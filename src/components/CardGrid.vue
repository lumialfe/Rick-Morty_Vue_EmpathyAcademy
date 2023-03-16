<template>
  <main>
    <slot></slot>
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
@import "../assets/styles/style.css";

main {
  display: grid;
  grid-template-columns: repeat(var(--numberOfColumns), minmax(50px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
}
</style>