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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
