<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.commit('addNewTruck');
      this.$store.commit('addNewGood');
    }
  }
</script>

<style>
  /* Style of the whole webapp */
  #app {
    color: #007FEB;
    font-size: 14px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
  }
</style>
