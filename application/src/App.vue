<template>
  <div id="app">
    <Map/>
    <ControlPanel/>
    <ControlPanelOutput/>
  </div>
</template>

<script>
  import ControlPanel from "@/components/ControlPanel";
  import Map from "@/components/Map";
  import ControlPanelOutput from "@/components/ControlPanelOutput";


  export default {
    name: 'App',
    components: {
      ControlPanel,
      ControlPanelOutput,
      Map,
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
