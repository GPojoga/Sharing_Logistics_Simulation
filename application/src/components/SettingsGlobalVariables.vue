<template>
    <div>
        <div v-for="variable in globalVariables" :key="variable.name" class="variableContainer">
            <div class="variableName">
                <p class="variableText">
                    {{variable.name}}
                </p>
            </div>
            <div class="variableField">
                <InputNumberBox :field="variable.field" :forward="{}" :setter="variable.setter" :placeholder="variable.unit"/>
            </div>
        </div>
    </div>
</template>

<script>
    import InputNumberBox from "./InputNumberBox";
    export default {
        name: "SettingsGlobalVariables",
        components: {
            InputNumberBox
        },
        computed: {
            globalVariables : function () {
                return [
                    {
                        name: "Emission Burnt Rate",
                        unit: "kg/L (CO2)",
                        field: this.$store.getters.emissionRate,
                        setter: "setEmissionRate"
                    },
                    {
                        name: "Max Good Splits",
                        unit: "#",
                        field: this.$store.getters.maxGoodSplits,
                        setter: "setMaxGoodSplits"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .variableContainer {
        height: 40px;
    }

    /* Style an entry of the name column */
    .variableName {
        width: 40%;
        float: left;
        text-align: left;
        padding-left: 5%;
    }

    /* Style the text in the entry of the name column, making sure there is so padding */
    .variableText {
        margin: 0;
    }

    /* Style an entry of the constant field */
    .variableField {
        width: 40%;
        float: right;
        text-align: center;
        padding-right: 5%;
    }
</style>