<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
  }
</script>

<style lang="scss">
  @import './assets/scss/partials/common';
  @mixin _size {
    width: 100%;
    height: 100%;
  }

  html, body {
    @include _size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    @include _size;
  }
</style>
