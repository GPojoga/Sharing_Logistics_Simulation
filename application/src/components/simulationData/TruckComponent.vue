<template>
    <div id="truckComponent">
        <img id="image" v-bind:src="truckImage" v-bind:alt="truck.properties.type"/>
        <div id="preview">
            <LocationComponent text="Initial Location" :data="truck.initialLocation"/>
            <LocationComponent text="Current Location" :data="truck.location"/>
            <LocationComponent text="Destination" :data="truck.route.end"/>
            <DataPosition id="dataPosition" text="More" v-on:extend="extend()" v-on:shrink="shrink()"/>
        </div>
        <div id="truckDetails" ref="truckDetails">
            <p class="entry"> Current order type : {{truck.currentOrder.type}}</p>
            <p class="entry"> Transported weight : {{truck.currentLoad.weight}} kg</p>
            <p class="entry"> Transported volume : {{truck.currentLoad.volume}} m^3</p>
            <p class="entry"> Total distance traveled : {{distanceTravelled}} km</p>
            <p class="entry"> Total fuel consumed : {{fuelConsumed}} l</p>
        </div>
    </div>
</template>

<script>
    import Truck from "@/classes/trucks/Truck.js"
    import LocationComponent from "@/components/simulationData/LocationComponent";
    import DataPosition from "@/components/simulationData/DataPosition";

    export default {
        name: "TruckComponent",
        components :{
            DataPosition,
          LocationComponent,
        },
        props:{
            truck: Truck
        },
        computed : {
            truckImage : function() {
                return "assets/" +
                    this.$store.getters.truckTypes.find(x => x.key === this.truck.properties.type).img;
            },

        },
        data(){
            return {
                fuelConsumed : 0,
                distanceTravelled : 0,
                detailsCollapsed : true,
            }
        },
        methods :{
            extend(){
                this.$refs["truckDetails"].style.height = this.$refs["truckDetails"].scrollHeight + "px";
                this.detailsCollapsed = false;
                this.updateFuelConsumed();
                this.updateDistanceTravelled();
            },
            shrink(){
                this.$refs["truckDetails"].style.height = "0";
                this.detailsCollapsed = true;
            },
            updateFuelConsumed(){
                if (!this.detailsCollapsed){
                    this.fuelConsumed = this.truck.fuelConsumed.toFixed(3);
                    setTimeout(this.updateFuelConsumed,2000);
                }
            },
            updateDistanceTravelled(){
                if (!this.detailsCollapsed){
                    this.distanceTravelled = (this.truck.distanceTravelled / 1000).toFixed(2);
                    setTimeout(this.updateDistanceTravelled,2000);
                }
            }
        }
    }
</script>

<style scoped>
    #truckComponent{
        width : 90%;
        position: relative;
        text-align: left;
        left: 2%;
        margin: 0;
        border: solid rgba(0, 127, 235, 0.2);
        border-width: 0 0 1px 0;
        padding-left: 3%;
        padding-right: 3%;
    }
    #image{
        width: 20%;
        height : 20%;
        padding: 3%;
        display: inline-block;
    }
    #preview{
        display: inline-block;
        position: relative;
        padding: 3%;
        width: 68%;
        top: 1px;
    }
    #dataPosition{
        padding: 2%;
        margin: 0;
        font-size: 100%;
    }
    #truckDetails{
        width: 100%;
        height: 0;
        background-color: white;
        border: solid 1px #007FEB;
        margin-bottom: 5%;
        transition: height 0.5s;
        font-size: 100%;
        text-align: left;
        overflow: hidden;
        padding: 0;
    }
    .entry{
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 2%;
    }
</style>