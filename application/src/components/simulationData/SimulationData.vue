<template>
    <div id="simulationData" ref="simulationData" class="collapsible">
        <div id="collapseController">
            <button id="collapseButton" v-on:click="collapseSD()">
                <i class="fas fa-angle-left" id="collapseArrowSimData"></i>
            </button>
        </div>
        <div id="header">
            <div id="simulationType">
                {{currentSimulationType}}
            </div>
            <div id="options">
                <div ref="truckButton" class="dataButton" v-on:click="selectTrucks()">
                    <svg class="dataImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path id="svg_1" d="m624,352l-16,0l0,-108.1c0,-12.7 -5.1,-24.9 -14.1,-33.9l-99.9,-99.9c-9,-9 -21.2,-14.1 -33.9,-14.1l-44.1,0l0,-48c0,-26.5 -21.5,-48 -48,-48l-320,0c-26.5,0 -48,21.5 -48,48l0,320c0,26.5 21.5,48 48,48l16,0c0,53 43,96 96,96s96,-43 96,-96l128,0c0,53 43,96 96,96s96,-43 96,-96l48,0c8.8,0 16,-7.2 16,-16l0,-32c0,-8.8 -7.2,-16 -16,-16zm-464,112c-26.5,0 -48,-21.5 -48,-48s21.5,-48 48,-48s48,21.5 48,48s-21.5,48 -48,48zm320,0c-26.5,0 -48,-21.5 -48,-48s21.5,-48 48,-48s48,21.5 48,48s-21.5,48 -48,48zm80,-208l-144,0l0,-112l44.1,0l99.9,99.9l0,12.1z"/>
                    </svg>
                </div>
                <div ref="productButton" class="dataButton" v-on:click="selectProducts()">
                    <svg class="dataImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16zm-384-64h224c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16h-80v96l-32-21.3L256 96V0h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class = "content">
            <div v-if="listToBeDisplayed === 'truckList'" >
                <p v-if="truckList.length === 0">
                    The truck list is empty
                </p>
                <div v-for="(truck,index) in truckList" :key="index" >
                    <TruckComponent :truck="truck"/>
                </div>
            </div>
            <div v-if="listToBeDisplayed === 'productList'">
                <p v-if="productList.length === 0">
                    The product list is empty
                </p>
                <div v-for="(good,index) in productList" :key="index" >
                    <GoodComponent :good="good"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {simulationType} from "@/classes/simulation/SimulationType";
    import TruckComponent from "@/components/simulationData/TruckComponent";
    import GoodComponent from "@/components/simulationData/GoodComponent";
    export default {
        name: "SimulationData",
        components:{
            GoodComponent,
          TruckComponent
        },
        watch :{
            simulationStatus(newStatus){
                if (newStatus){
                    this.expand();
                }else{
                    this.shrink();
                }
            }
        },
        computed:{
            simulationStatus(){
              return this.$store.state.isRunning;
            },
            currentSimulationType : function(){
                switch (this.$store.state.currentSimulationType) {
                    case simulationType.TRADITIONAL:
                        return "Traditional Simulation";
                    case simulationType.SHARED:
                        return "Shared Simulation";
                    default:
                        return "No Simulation Available";
                }
            },
            currentSimulation : function(){
                switch (this.$store.state.currentSimulationType) {
                    case simulationType.TRADITIONAL:
                        return this.$store.state.traditionalSimulation;
                    case simulationType.SHARED:
                        return this.$store.state.sharedSimulation;
                    default:
                        return null;
                }
            },
            truckList : function(){
              let simulation = this.currentSimulation;
              if(simulation === null){
                  return [];
              }
              return simulation.getTrucks();
            },
            productList : function(){
                let simulation = this.currentSimulation;
                if(simulation === null){
                    return [];
                }
                return simulation.getAllGoods();
            }
        },
        data(){
            return{
                listToBeDisplayed : "truckList",
            }
        },
        mounted(){
            this.selectTrucks();
        },
        methods :{
            collapseSD() {
                let simulationData = document.getElementById('simulationData');
                let collapseArrowSimData = document.getElementById('collapseArrowSimData');

                collapseArrowSimData.style.transform = this.controlPanelLeftPos === 0 ?
                    "rotate(0)" : "rotate(180deg)";

                simulationData.style.right = (simulationData.style.right === "0px" ? "-400px" : "0px");
                collapseArrowSimData.style.transform = simulationData.style.right === "0px" ? "rotate(180deg)" : "rotate(0deg)";
                // this.$refs["collapseArrow"].style.transform = this.$refs["simulationData"].style.right === "0px" ?
                //     "rotate(180deg)" : "rotate(0deg)";
            },
            expand(){
                this.updateSimulationDataPanel("0px","rotate(180deg)");
            },
            shrink(){
                this.updateSimulationDataPanel("-400px","rotate(0deg)");
            },
            updateSimulationDataPanel(right,rotation){
                this.$refs["simulationData"].style.right = right;
                this.$refs["collapseArrowSimData"].style.transform = rotation;
            },
            selectTrucks(){
                this.activate(this.$refs["truckButton"],this.$refs["productButton"]);
                this.listToBeDisplayed = "truckList";
            },
            selectProducts(){
                this.activate(this.$refs["productButton"],this.$refs["truckButton"]);
                this.listToBeDisplayed = "productList";
            },
            activate(toActivate,toDeactivate){
                toActivate.style.background = "white";
                toActivate.style.fill = "#007FEB";

                toDeactivate.style.background = "#007FEB";
                toDeactivate.style.fill = "white";
            }

        }
    }

</script>

<style scoped>
    #simulationData {
        background: rgb(255, 255, 255);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        height: 100%;
        width: 400px;
        overflow: visible;
        position: absolute;
        color: #007FEB;
        transition: right 0.5s;
        right: -400px;
    }

    .content{
        overflow-y: scroll;
    }

    .dataImage{
        width : 80%;
        height: 80%;
        padding-top: 10%;
    }

    .dataButton{
        width : 10%;
        height : 100%;
        display: inline-block;
        padding-right: 0.5em;
        padding-left: 0.5em;
        fill:white;
    }

    #header{
        height: 60px;
        padding: 10px 10px 0 10px;
        background-color: #007FEB;
    }

    #options{
        height: 30px;
    }

    #simulationType {
        width: 100%;
        height: 30px;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 150%;
    }

    #collapseController{
        opacity: 0.9;
        width: 23px;
        height: 48px;
        position: absolute;
        bottom: 100%;
        top: 8px;
        right: 100%;
    }

    #collapseButton{
        z-index: -1;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: white;
        border-radius: 2px;
        cursor: pointer;
        padding: 0;
        box-shadow: -10px 5px 20px rgba(0, 0, 0, 0.3);
    }

    #collapseArrowSimData{
        font-size: 200%;
        color: #007FEB;
        transition: transform 0.5s;
    }

    button:focus{
        outline: none;
    }

    button::-moz-focus-inner {
        border: 0;
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