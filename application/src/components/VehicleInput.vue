<template>
    <div class="vehicle">
        <div class="header">
            <span>Vehicle</span>
            <div class="remove">
                <button @click="removeVehicle" type="button" class="button circle cross"></button>
            </div>
        </div>
        <div class="row">
            <div v-for="(t,index) in truckTypes"
                 :key="index"
                 class="imageTab"
                 :class="{ selected: (selected === index), unselected: selected !== index }"
                 @click="setSelected(index)">
                <img :src="'assets/' + t.img" :alt="t.name" style="width:100%">
            </div>
        </div>
        <JourneyInput :date-valid="true" :locations-valid="locationsValid" @journeyChange="this.$emit('journeyChange')"/>
    </div>
</template>

<script>
    import JourneyInput from "./JourneyInput";

    export default {
        name: "VehicleInput",
        components: {JourneyInput},
        props: {
            locationsValid : Boolean,
            index : Number
        },
        data() {
            return {
                selected: -1,
            }
        },
        methods: {
            setSelected(i) {
                this.selected = i;
            },
            removeVehicle() {
                this.$store.dispatch('removeVehicle', this.index);
            }
        },
        computed: {
            truckTypes() {
                return this.$store.state.truckTypes;
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 40px;
    }

    span {
        margin: 10px 0;
        float: left;
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .vehicle {
        margin: 0;
        border: 2px solid #007feb;
        border-radius: 5px;
        padding: 10px 15px;
    }

    /* Selectable image tabs of the types of trucks */
    .imageTab {
        width: 25%;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
    }

    .unselected:hover {
        background-color: #f1f9ff;
        cursor: pointer;
    }

    .selected {
        background-color: #d8efff;
    }

    /* Button to remove this vehicle */
    .remove {
        float: right;
    }

    .button {
        background-color: #f1f9ff;;
        text-align: left;
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .button:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        cursor: pointer;
    }

    /* Circle class */
    .circle {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        position: relative;
        margin: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .circle:before,
    .circle:after {
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    /* Cross in circle */
    .circle.cross:after,
    .circle.cross:before {
        background: #007feb;
        margin: auto 8px;
        height: 2px;
        transform:rotateZ(45deg);
    }
    .circle.cross:after {
        transform:rotateZ(-45deg);
    }
</style>