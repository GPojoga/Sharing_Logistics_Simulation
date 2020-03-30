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
    },
    methods: {
      /**
       * This function checks if the journey input is correct
       * @returns {boolean} true if input is within constraints false otherwise.
       */
      checkJourneyInput() {
        let isCorrect = true;
        if (this.$store.state.locations[0] === null) {
          isCorrect = false;
          this.$emit("invalidLocation",0);
        }
        if (this.$store.state.locations[1] === null) {
          isCorrect = false;
          this.$emit("invalidLocation",1);
        }
        return isCorrect;
      },
      /**
       * This function checks if the input date is correct.
       * @returns {boolean} true if input is within constraints false otherwise.
       */
      checkDateInput() {
        let isCorrect = true;
        if (this.$store.state.departureDate === ""){
          isCorrect = false;
          this.$emit("invalidDate");
        }
        return isCorrect;
      },
      /**
       * This function checks if the input vehicle is correct.
       * @returns {boolean} true if input is within constraints false otherwise.
       */
      checkVehicleInput() {
        let isCorrect = true;
        let vehicles = this.$store.state.A.vehicles;
        let sum = 0;
        for (let i = 0; i < vehicles.length; i++) {
          sum += vehicles[i];
          if (vehicles[i] < 0){
            isCorrect = false;
            this.$emit("invalidVehicle", 0, i);
          }
        }
        if (sum === 0){
          isCorrect = false;
          this.$emit("invalidVehicles",0);
        }
        return isCorrect;
      },
      /**
       * This function checks if the input products is correct.
       * @returns {boolean} true if input is within constraints false otherwise.
       */
      checkProductsInput() {
        let isCorrect = true;
        let maxWeight = this.$store.state.TruckTypes[0].maxPayload;
        let maxVolume = this.$store.state.TruckTypes[0].volume;
        let products = this.$store.state.A.cargo;
        for (let i = 0; i < products.length; i++){
          if (products[i].quantity < 0) {
            isCorrect = false;
            this.$emit("invalidQuantity", i);
          }
          if (products[i].weight < 1 || products[i].weight > maxWeight) {
            isCorrect = false;
            this.$emit("invalidWeight", i);
          }
          if (products[i].volume < 1 || products[i].volume > maxVolume) {
            isCorrect = false;
            this.$emit("invalidVolume", i);
          }
        }
        return isCorrect;
      },
      checkInputs() {
        return this.checkJourneyInput() && this.checkDateInput() && this.checkProductsInput() && this.checkVehicleInput();
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
