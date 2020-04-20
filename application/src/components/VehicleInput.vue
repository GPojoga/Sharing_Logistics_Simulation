<template>
    <div class="vehicle">
        <p>Vehicle</p>
        <div class="row">
            <div v-for="t in truckTypes" :key="t.index" class="imageTab" :class="{ selected: (selected === t.index), unselected: selected !== t.index }" @click="setSelected(t.index)">
                <img :src="'assets/' + t.source" :alt="t.name" style="width:100%">
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
            locationsValid : Boolean
        },
        data() {
            return {
                selected: -1,
                truckTypes: [
                    {
                        index: 0,
                        source: 'light_duty_van.svg',
                        name: "Light-duty van"
                    },
                    {
                        index: 1,
                        source: 'heavy_duty_van.svg',
                        name: "Heavy-duty van"
                    },
                    {
                        index: 2,
                        source: 'train_truck.svg',
                        name: "Train truck"
                    }
                ]
            }
        },
        methods: {
            setSelected(index) {
                this.selected = index;
            }
        }
    }
</script>

<style scoped>
    p {
        margin: 10px 0;
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .vehicle {
        margin: 10px 10px;
        border-radius: 5px;
        background-color: #f1f9ff;
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
        background-color: #e1f0ff;
        cursor: pointer;
    }

    .selected {
        background-color: #c7d5e3;
    }
</style>