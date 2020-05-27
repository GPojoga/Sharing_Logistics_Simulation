<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()">
        <i class="fas fa-angle-left" id="collapseArrow"></i>
      </button>
    </div>
    <div class = "content">
      <FleetInput/>
      <CargoInput :products-valid="validProducts" @productChange="setValidProducts"/>
      <div class="buttonsContainer">
        <basic-button layout="solid" class="settingContainer">
          <router-link to="/settings">
            Settings
          </router-link>
        </basic-button>
        <div class="calculateContainer">
          <CalculateRate @calculateTraditional="calculateRate('traditional')"
                         @calculateSharing="calculateRate('shared')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CargoInput from "./CargoInput";
import CalculateRate from "./CalculateRate";
import FleetInput from "./FleetInput";
import {simulationType} from '../classes/SimulationType';
import BasicButton from "./BasicButton";

export default {
  name: 'ControlPanel',
  components: {
    BasicButton,
    FleetInput,
    CalculateRate,
    CargoInput
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
    setValidLocations() {
      this.validLocations = true;
    },
    setValidProducts() {
      this.validProducts = true;
    },
    checkInputs() {
      return true;
    },
    calculateRate(type) {
      if (this.checkInputs()){
        const simType = (type === 'traditional')? simulationType.TRADITIONAL : simulationType.SHARED;
        this.$store.commit("setSimulation",{type : simType,store : this.$store,router : this.$router});
        if(simType === simulationType.TRADITIONAL){
          this.$store.commit("startTraditionalSimulation");
        }else{
          this.$store.commit("startSharedSimulation");
        }
      }
    }
  }
}
</script>

<style scoped>
  #controlPanel {
    background: rgb(255, 255, 255);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 400px;
    overflow: visible;
    position: absolute;
    left: 0;
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

  /* Style the container containing the settingContainer and calculateContainer */
  .buttonsContainer {
    padding: 10px;
    height: 80px;
  }

  /* Style the container of the link to settings */
  .settingContainer {
    margin : 0;
    width: 30%;
    float : left;
    display: inline-block;
  }

  /* Style the link itself */
  a {
    text-decoration: none;
    color: #FFF;
    /*-webkit-border-radius: 4px;*/
    /*-moz-border-radius: 4px;*/
    /*border-radius: 4px;*/
    /*background: #007feb;*/
    /*padding: 8px 12px;*/
  }

  /* Style the container for the calc button */
  .calculateContainer {
    width : 50%;
    height : 90px;
    margin : 0;
    float : right;
    display: inline-block;
  }

  /* Scrollbar layout */
  /* width */
   ::-webkit-scrollbar {
     width: 6px;
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
