<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()"></button>
    </div>
    <JourneyInput @journey-submitted="setJourney"></JourneyInput>
    <p v-if="!journey">No journey details available.</p>
    <div v-if="journey">
      <p>{{ journey.from }}</p>
      <p>{{ journey.to }}</p>
      <p>{{ journey.date }}</p>
      <p>{{ journey.twoWay }}</p>
    </div>
  </div>
</template>

<script>
import JourneyInput from "./JourneyInput";
export default {
  name: 'ControlPanel',
  components: {
    JourneyInput
  },
  data() {
    return{
      controlPanelLeftPos: 0,
      journey: null
    }
  },
  methods:{
    collapseCP(){

      let controlPanel = document.getElementById('controlPanel');

      this.controlPanelLeftPos = this.controlPanelLeftPos === 0 ? -400 : 0;
      controlPanel.style.left = this.controlPanelLeftPos.toString(10)+"px";
    },
    setJourney(journeyDetails) {
      this.journey = journeyDetails;
    }
  }
}
</script>

<style scoped>
  #controlPanel{
    background: #ffffff;
    height: 100%;
    width: 400px;
    overflow: visible;
    position: absolute;
    left:0;
    color: #2284ff;
    transition: left 0.5s;
  }

  #collapseController{
    width: 20px;
    height: 40px;
    position: absolute;
    right:0;
    top:50%;
  }

  #collapseButton{
    border: solid #aca687;
    background-color: #7e6880;
    padding: 20px;
    border-radius: 50%;
  }

  button:focus{
    outline: none;
  }
</style>
