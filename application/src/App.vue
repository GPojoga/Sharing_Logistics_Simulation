<template>
  <div id="app">
    <Map/>
    <ControlPanel/>
  </div>
</template>

<script>
  import ControlPanel from "@/components/ControlPanel";
  import Map from "@/components/Map";

  export default {
    name: 'App',
    components: {
      ControlPanel,
      Map,
    },
    created: function () {
      let store = this.$store.state;
      for (let i = 0; i < store.maxNrLocations;i++){
        store.locations.push(null);
      }
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
