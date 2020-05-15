<template>
  <div id="app">
    <loading-page v-if="isLoading"/>
    <router-view v-else/>
  </div>
</template>

<script>
  import LoadingPage from "./views/LoadingPage";
  export default {
    name: 'App',
    components: {LoadingPage},
    data() {
      return {
        isLoading: true
      }
    },
    mounted(){
      // TODO : initialize the store data here.
      setTimeout(() => {
        this.isLoading = false
      }, 0);
    }
  }
</script>

<style>
  /* Style of the whole webapp */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
  }
</style>
