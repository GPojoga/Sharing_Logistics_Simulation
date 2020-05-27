<template>
    <div class="calcRate">
        <div class="simulationButton">
            <basic-button @click="calculateTraditional" type="button" class="calcRateButton">Simulate traditional method</basic-button>
        </div>
        <div class="simulationButton">
            <basic-button @click="calculateSharing" type="button" class="calcRateButton">Simulate shared method</basic-button>
        </div>
        <div class="simulationButton">
            <basic-button layout="solid" type="button" class="calcRateButton" @click="showOutput">
                Show results
            </basic-button>
        </div>
    </div>
</template>

<script>
    // import BasicButton from "./BasicButton";
    import BasicButton from "./BasicButton";
    export default {
        name: "CalculateRate",
        components: {BasicButton},
        // components: {BasicButton},
        methods: {
            calculateTraditional(){
                this.$emit("calculateTraditional");
            },
            calculateSharing(){
                this.$emit("calculateSharing");
            },
            showOutput(){
                this.$router.push('output');
            }
        }
    }

</script>



<style scoped>
    .calcRateButton{
        width: 100%;
        text-decoration: none;
        display: inline-block;
    }

    .simulationButton {
        margin-bottom: 5px;
    }

</style>