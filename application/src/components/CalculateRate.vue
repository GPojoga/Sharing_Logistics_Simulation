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
    import BasicButton from "./BasicButton";
    export default {
        name: "CalculateRate",
        components: {BasicButton},
        data() {
            return {
                message : "Error(s) found, \nplease check the input highlighted in red.",
            };
        },
        computed : {
            emissionRate : function () {
                return this.$store.getters.emissionRate;
            },
            maxSpeed : function () {
                return this.$store.getters.maxSpeed;
            },
            truckTypes : function () {
                return this.$store.getters.truckTypes;
            },
            trucks : function () {
                return this.$store.getters.trucks;
            },
            goods : function () {
                return this.$store.getters.goods;
            },
        },
        methods: {
            /**
             * This is a helper function for the checkForErrors function. It checks for errors in the global variables.
             */
            globalVariableError(){
                return (this.emissionRate.error || this.maxSpeed.error);
            },
            /**
             * This is a helper function for the checkForErrors function. It checks for errors in the truck variables.
             */
            truckVariableError(){
                for (let i = 0; i < this.truckTypes.length; i++){
                    let type = this.truckTypes[i];
                    if (type.volume.error || type.maxPayload.error) return true;
                    if (type.consumptionEmpty.error || type.consumptionFull.error) return true;
                }
                return false;  // No errors found
            },
            /**
             * This is a helper function for the checkForErrors function. It checks for errors in the truck input.
             */
            truckInputError(){
                for (let i = 0; i < this.trucks.length; i++){
                    let truck = this.trucks[i];
                    if (truck.quantity.error) return true;
                    if (truck.startLocation.error) return true;
                }
                return false;  // No errors found
            },
            /**
             * This is a helper function for the checkForErrors function. It checks for errors in the good input.
             */
            goodInputError(){
                for (let i = 0; i < this.goods.length; i++){
                    let good = this.goods[i];
                    if (good.quantity.error || good.weight.error || good.volume.error) return true;
                    if (good.pickupLocation.error || good.deliveryLocation.error) return true;
                }

                return false;  // No errors found
            },
            /**
             * This function checks for errors in the input of the simulation before running the simulation.
             */
            checkForErrors(){
                return (this.globalVariableError() || this.truckVariableError() || this.truckInputError() || this.goodInputError());
            },
            /**
             * This function is called when the user wants to simulate the traditional transportation.
             */
            calculateTraditional(){
                if (this.checkForErrors()) alert(this.message);
                else this.$emit("calculateTraditional");
            },
            /**
             * This function is called when the user wants to simulate the sharing logistics transportation.
             */
            calculateSharing(){
                if (this.checkForErrors()) alert(this.message);
                else this.$emit("calculateSharing");
            },
            /**
             * This function is called when the user wants to see the output it brings them to the output page.
             */
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