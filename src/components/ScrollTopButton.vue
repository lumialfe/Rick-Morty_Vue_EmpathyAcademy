<template>
    <button @click="toTop">
      <img src="../assets/media/backtop.png" width="50px"/>
    </button>
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
  :hover {
    border-radius: 500px;
  }
  img {
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 1;
    bottom: 25px;
    left: 25px;
    :hover {
      opacity: 69%;
    }
  }
}
</style>