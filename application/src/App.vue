<template>
  <div id="app">
    <ControlPanel />
  </div>
</template>

<script>
  import ControlPanel from "@/components/ControlPanel";

  export default {
    name: 'App',
    components: {
      ControlPanel,
    }
  }
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ff001f;
    width: 100%;
    height: 100%;
  }
</style>
