<template>
    <div id="controlPanelOutput" class="collapsible">
        <div class="new">
            <h1>New Way</h1>
            <div id="newWayPanel" class="panel">
                <div id="deliveryDate" class="deliveryDate"><h3>Expected delivery date:</h3></div>
                <div id="vehicleUsed" class="vehicleUsed"><h3>Total numbers of vehicles used:</h3></div>
                <div id="Co2E" class="Co2E"><h3>Co2 Emissions:</h3></div>
            </div>
        </div>
        <div id="collapseController">
            <button id="collapseButton" v-on:click="collapseCPO()">
                <i class="fas fa-angle-left" id="collapseArrowO"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ControlPanelOutput',
        components: {

        },
        data() {
            return {
                controlPanelLeftPos: 0,
                journey: null
            }
        },
        methods: {
            collapseCPO() {

                let controlPanel = document.getElementById('controlPanelOutput');
                let collapseArrow = document.getElementById('collapseArrowO');

                this.controlPanelLeftPos = this.controlPanelLeftPos === 0 ? -600 : 0;
                controlPanel.style.right = this.controlPanelLeftPos.toString(10) + "px";

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
    #controlPanelOutput{
        background: rgb(255, 255, 255);
        border: solid #2284ff;
        height: 70%;
        width: 600px;
        overflow: visible;
        position: absolute;
        top: 0.5%;
        right: 0;
        color: #007FEB;
        transition: right 0.5s;
    }

    #collapseController{
        opacity: 0.9;
        width: 10%;
        height: 10%;
        position: absolute;
        left: -20%;
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

    #collapseArrowO{
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

    #newWayPanel{
        height: 70%;
        width: 70%;
        background-color: #f1f9ff;
        position: absolute;
        left: 15%;
    }

    #deliveryDate{
        left: 2%;
        position: absolute;
    }

    #vehicleUsed{
        left: 2%;
        position: absolute;
        top: 25%;
    }

    #Co2E{
        left: 2%;
        position: absolute;
        top: 50%;
    }
</style>