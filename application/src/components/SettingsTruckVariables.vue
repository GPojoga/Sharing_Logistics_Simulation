<template>
    <div>
        <div v-for="variable in truckVariables" :key="variable.name">
            <div class="variableName">
                <p class="variableSubText">
                    {{variable.name}}
                </p>
            </div>
            <div class="variableField">
                <InputNumberBox :field="variable.field" :forward="forward" :setter="variable.setter" :placeholder="variable.unit"/>
            </div>
        </div>
    </div>
</template>

<script>
    import InputNumberBox from "./InputNumberBox";
    export default {
        name: "SettingsTruckVariables",
        props: {
            index: Number,
        },
        components: {
            InputNumberBox
        },
        computed: {
            truckVariables : function () {
                return [
                    {
                        name : "Max Volume",
                        unit : "m^3",
                        field : this.$store.getters.truckTypes[this.index].volume,
                        setter : "setVolume"
                    },
                    {
                        name : "Max Payload",
                        unit : "kg",
                        field : this.$store.getters.truckTypes[this.index].maxPayload,
                        setter : "setMaxPayload"
                    },
                    {
                        name : "Empty Fuel Consumption",
                        unit : "L/km",
                        field : this.$store.getters.truckTypes[this.index].consumptionEmpty,
                        setter : "setConsumptionEmpty"
                    },
                    {
                        name : "Full Fuel Consumption",
                        unit : "L/km",
                        field : this.$store.getters.truckTypes[this.index].consumptionFull,
                        setter : "setConsumptionFull",
                    },
                ]
            }
        },
        data : function () {
            return {
                // An object containing the index so it can be forwarded to the setter.
                forward: {
                    index: this.index,
                }
            }
        }
    }
</script>

<style scoped>
    /* Style an entry of the name column */
    .variableName {
        width: 40%;
        height: 30px;

        float: left;
        text-align: left;
        padding-left: 7.5%;
    }

    /* Style the text in the entry of the name column, making sure there is so padding */
    .variableSubText {
        font-size: small;
        margin: 0;
    }

    /* Style an entry of the constant field */
    .variableField {
        width: 40%;
        height: 30px;

        float: right;
        text-align: center;
        padding-right: 5%;
    }
</style>