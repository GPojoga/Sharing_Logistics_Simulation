<template>
    <div id="truckComponent">
        <img id="image" v-bind:src="truckImage" v-bind:alt="truck.properties.type"/>
        <div id="preview">
            <DetailsComponent text="Initial Location" :data="truck.initialLocation"/>
            <DetailsComponent text="Current Location" :data="truck.location"/>
            <DetailsComponent text="Destination" :data="truck.route.end"/>
        </div>
    </div>
</template>

<script>
    import Truck from "@/classes/trucks/Truck.js"
    import DetailsComponent from "@/components/LocationComponent";

    export default {
        name: "TruckComponent",
        components :{
          DetailsComponent,
        },
        props:{
            truck: Truck
        },
        computed : {
            truckImage : function() {
                let toReturn = "assets/" +
                    this.$store.getters.truckTypes.find(x => x.key === this.truck.properties.type).img;
                console.log(toReturn);
                return toReturn;
            }
        },
        methods :{
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

</style>