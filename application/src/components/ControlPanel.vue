<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()">
        <i class="fas fa-angle-left" id="collapseArrow"></i>
      </button>
    </div>
    <div class = "content">
      <VehicleInput :locations-valid="validLocations" @journeyChange="setValidLocations"/>
      <VehicleSelector :total-valid="validVehicles" :field-valid="validVehiclesFields" @vehicleChange="setValidVehicles"/>
      <ProductInput :products-valid="validProducts" @productChange="setValidProducts"/>
      <div>
        <div class="settingContainer">
          <router-link to="/settings">
            Settings
          </router-link>
        </div>
        <div class="calculateContainer">
          <CalculateRate @calculateRate="calculateRate"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VehicleSelector from "./VehicleSelector";
import ProductInput from "./ProductInput";
import CalculateRate from "./CalculateRate";
import VehicleInput from "./VehicleInput";

export default {
  name: 'ControlPanel',
  components: {
    VehicleInput,
    CalculateRate,
    VehicleSelector,
    ProductInput
  },
  data() {
    return {
      controlPanelLeftPos: 0,

      validLocations: true,
      validDate : true,
      validVehicles: true,
      validVehiclesFields: [true, true, true],
      validProducts : true
    }
  },
  methods: {
    collapseCP() {

      let controlPanel = document.getElementById('controlPanel');
      let collapseArrow = document.getElementById('collapseArrow');

      this.controlPanelLeftPos = this.controlPanelLeftPos === 0 ? -400 : 0;
      controlPanel.style.left = this.controlPanelLeftPos.toString(10) + "px";

      collapseArrow.style.transform = this.controlPanelLeftPos === 0 ?
              "rotate(0)" : "rotate(180deg)";
    },
    /**
     * This function checks if the journey input is correct
     * @returns {boolean} true if input is within constraints false otherwise.
     */
    checkJourneyInput() {
      let isCorrect = (this.$store.state.locations.list[0] !== null) && (this.$store.state.locations.list[1] !== null);
      this.validLocations = isCorrect;
      return isCorrect;
    },
    setValidLocations() {
      this.validLocations = true;
    },
    /**
     * This function checks if the input date is correct.
     * @returns {boolean} true if input is within constraints false otherwise.
     */
    checkDateInput() {
      let isCorrect = true;
      if (this.$store.state.departureDate === ""){
        isCorrect = false;
        this.validDate = false;
      }
      return isCorrect;
    },
    setValidDate() {
      this.validDate = true;
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
          this.validVehiclesFields[i] = false;
        }
      }
      if (sum === 0){
        isCorrect = false;
        this.validVehicles = false;
      }
      return isCorrect;
    },
    setValidVehicles() {
      this.validVehicles = true;
      this.validVehiclesFields[0] = true;
      this.validVehiclesFields[1] = true;
      this.validVehiclesFields[2] = true;
    },
    /**
     * This function checks if the input products is correct.
     * @returns {boolean} true if input is within constraints false otherwise.
     */
    checkProductsInput() {
      let isCorrect = true;
      let maxWeight = this.$store.state.truckTypes[0].maxPayload;
      let maxVolume = this.$store.state.truckTypes[0].volume;
      let products = this.$store.state.A.cargo;
      for (let i = 0; i < products.length; i++){
        if (products[i].quantity === "" || products[i].quantity < 0) {
          isCorrect = false;
          this.validProducts = false;
        }
        if (products[i].weight === "" || products[i].weight < 1 || products[i].weight > maxWeight) {
          isCorrect = false;
          this.validProducts = false;
        }
        if (products[i].volume === "" || products[i].volume < 1 || products[i].volume > maxVolume) {
          isCorrect = false;
          this.validProducts = false;
        }
      }
      return isCorrect;
    },
    setValidProducts() {
      this.validProducts = true;
    },
    checkInputs() {
      let isCorrect = true;
      isCorrect = this.checkJourneyInput() && isCorrect;
      isCorrect = this.checkDateInput() && isCorrect;
      isCorrect  = this.checkProductsInput() && isCorrect;
      return this.checkVehicleInput() && isCorrect;
    },
    calculateRate() {
      if (this.checkInputs()){
        this.$router.push('output');
      }
    }
  }
}
</script>

<style scoped>
  #controlPanel{
    background: rgb(255, 255, 255);
    border: solid #007FEB;
    height: 98%;
    width: 400px;
    overflow: visible;
    position: absolute;
    top: 0.5%;
    left:0;
    color: #007FEB;
    transition: left 0.5s;
  }

  .content{
    width: 100%;
    height: 100%;
    overflow:auto;
  }

  #collapseController{
    opacity: 0.9;
    width: 10%;
    height: 10%;
    position: absolute;
    right:-15%;
    top:5%;
  }

  #collapseButton{
    width: 100%;
    height: 100%;
    border: solid #f6f6f6;
    position: absolute;
    background-color: #f6f6f6;
    border-radius: 12px;
  }

  #collapseArrow{
    font-size: 300%;
    color: #007FEB;
    transition: transform 0.5s;
  }

  button:focus{
    outline: none;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  /* Style the container of the link to settings */
  .settingContainer {
    width : 50%;
    height : 90px;
    margin : 0;
    float : left;
    vertical-align: center;
    line-height: 90px;
  }

  /* Style the link itself */
  a {
    text-decoration: none;
    color: #FFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #007feb;
    padding: 8px 12px;
  }

  /* Style the container for the calc button */
  .calculateContainer {
    width : 50%;
    height : 90px;
    margin : 0;
    float : right;
  }

  /* Scrollbar layout */
  /* width */
   ::-webkit-scrollbar {
     width: 8px;
   }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f9ff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2284ff;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #197cd8;
  }
</style>
