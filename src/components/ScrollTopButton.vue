<template>
    <button @click="toTop">^</button>
</template>

<script>
export default {
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      this.$parent.isVisibleScrollTop = false;
    }
  }
}
</script>

<style scoped lang="scss">
button {
  background: white;
  border: none;
  border-radius: 500px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 25px;
  left: 25px;

  :active {
    opacity: 60%;
  }
}
</style>