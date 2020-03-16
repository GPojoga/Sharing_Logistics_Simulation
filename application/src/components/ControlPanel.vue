<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()">
        <i class="fas fa-angle-left" id="collapseArrow"></i>
      </button>
    </div>
    <JourneyInput @journey-submitted="setJourney"></JourneyInput>
    <p v-if="!journey">No journey details available.</p>
    <div v-if="journey">
      <p>{{ journey.from }}</p>
      <p>{{ journey.to }}</p>
      <p>{{ journey.date }}</p>
      <p>{{ journey.twoWay }}</p>
    </div>

    <VehicleSelector></VehicleSelector>

  </div>
</template>

<script>

import VehicleSelector from "./VehicleSelector";
import JourneyInput from "./JourneyInput";
export default {
  name: 'ControlPanel',
  components: {
    JourneyInput,
    VehicleSelector
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
    }
  }
}
</script>

<style scoped>
  #controlPanel{
    background: rgb(255, 255, 255);
    border: solid #7796ff;
    height: 98%;
    width: 400px;
    overflow: visible;
    position: absolute;
    top: 0.5%;
    left:0;
    color: #fffece;
    transition: left 0.5s;
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
    color: #7796ff;
    transition: transform 1s;
  }

  button:focus{
    outline: none;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  .location > ::placeholder{
    color:#93cd7c
  }

  .location{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 5%;
  }

  .location > input{
    display: block;
    height: 100%;
    width: 90%;
    position: absolute;
    background-color: #806c7f;
    border: solid #939540;
    color: #87aeb8;
    font-weight: bold;
    font-size: large;
  }


</style>
