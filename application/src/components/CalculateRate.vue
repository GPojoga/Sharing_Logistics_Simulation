<template>
    <div class="calcRate">
        <div class="simulationButton">
            <button @click="calculateTraditional" type="button" class="calcRateButton">Traditional Rate</button>
        </div>
        <div class="simulationButton">
            <button @click="calculateSharing" type="button" class="calcRateButton">Shared Rate</button>
        </div>
    </div>
</template>

<script>
    // import BasicButton from "./BasicButton";
    export default {
        name: "CalculateRate",
        // components: {BasicButton},
        methods: {
            calculateTraditional(){
                this.$emit("calculateTraditional");
            },
            calculateSharing(){
                this.$emit("calculateSharing");
            }

        }
    }

</script>



<style scoped>
    .calcRate {
        margin: 25px;
        text-align: center;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .calcRateButton{
        width: 150px;
        text-decoration: none;
        display: inline-block;
    }

    .simulationButton {
        margin: 5px;
    }

</style>