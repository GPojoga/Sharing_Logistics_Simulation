<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()">
        <i class="fas fa-angle-left" id="collapseArrow"></i>
      </button>
    </div>
    <div class = "content">
      <JourneyInput @journey-submitted="setJourney"/>
      <VehicleSelector/>
      <ProductInput/>
      <CalculateRate/>
    </div>
  </div>
</template>

<script>

import VehicleSelector from "./VehicleSelector";
import JourneyInput from "./JourneyInput";
import ProductInput from "./ProductInput";
import CalculateRate from "./CalculateRate";

export default {
  name: 'ControlPanel',
  components: {
    CalculateRate,
    JourneyInput,
    VehicleSelector,
    ProductInput
  },
  data() {
    return {
      controlPanelLeftPos: 0,
      journey: null
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
    setJourney(journeyDetails) {
      this.journey = journeyDetails;
    },

    /**
     * This function checks whether the current input falls within constraints.
     */
    checkInput: function () {
      let isCorrect = true;

      if (isCorrect){
        this.$emit("valid input");
      }
    }
  }
}
</script>

<style scoped>
  #controlPanel{
    background: rgb(255, 255, 255);
    border: solid #2284ff;
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
    height:100%;
    border: solid #f6f6f6;
    position: absolute;
    background-color: #f6f6f6;
    border-radius: 12px;
  }

  #collapseArrow{
    font-size: 300%;
    color: #2284ff;
    transition: transform 0.5s;
  }

  button:focus{
    outline: none;
  }

  button::-moz-focus-inner {
    border: 0;
  }


</style>
