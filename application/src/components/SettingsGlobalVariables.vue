<template>
    <div>
        <div v-for="variable in globalVariables" :key="variable.name">
            <div class="variableName">
                <p class="variableText">
                    {{variable.name}}
                </p>
            </div>
            <div class="variableField">
                <InputNumberBox :field="variable.field" :forward="{}" :setter="variable.setter"/>
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
                        field: this.$store.getters.emissionRate,
                        setter: "setEmissionRate"
                    },
                    {
                        name: "Max Speed",
                        field: this.$store.getters.maxSpeed,
                        setter: "setMaxSpeed"
                    }
                ]
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
        padding-left: 5%;
    }

    /* Style the text in the entry of the name column, making sure there is so padding */
    .variableText {
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