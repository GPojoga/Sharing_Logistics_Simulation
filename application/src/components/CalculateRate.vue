<template>
    <div class="calcRate">
        <div class="simulationButton">
            <basic-button @click="calculateTraditional" type="button" class="calcRateButton">Traditional Rate</basic-button>
        </div>
        <div class="simulationButton">
            <basic-button @click="calculateSharing" type="button" class="calcRateButton">Shared Rate</basic-button>
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