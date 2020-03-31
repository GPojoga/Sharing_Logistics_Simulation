<template>
    <div class="calcRate">
        <button @click="getInput" type="button" class="calcRateButton">Calculate Rate</button>
    </div>
</template>

<script>

    export default {
        name: "CalculateRate",

        data: function () {
            return {
                info : this.$store.state
            }
        },


        methods: {

            getInput(){
                alert("Position From = " + this.getPositionFrom() +
                      "\nPosition To = "   + this.getPositionTo()   +
                      "\nLight Duty Van = " + this.getVehicleA() +
                      "\nHeavy Duty Van = " + this.getVehicleB() +
                      "\nTrain Trucks = " + this.getVehicleC() +
                      "\nTotal Quantity = " + this.getTotalQuantity() +
                      "\nTotal Weight = " + this.getTotalWeight() +
                      "\nTotal Volume = " + this.getTotalVolume() );
            },

            getPositionFrom() {
                return JSON.stringify(this.$store.state.locations[0].pos, null, 2);
            },

            getPositionTo(){
                return JSON.stringify(this.$store.state.locations[1].pos, null, 2);
            },

            getVehicleA() {
                return this.$store.state.A.vehicles[0];
            },

            getVehicleB() {
                return this.$store.state.A.vehicles[1];
            },

            getVehicleC() {
                return this.$store.state.A.vehicles[2];
            },

            getTotalQuantity(){
                let sum = 0;
                for (let step = 0; step < this.$store.state.A.cargo.length; step++) {
                    sum += Number(this.$store.state.A.cargo[step].quantity)
                }
                return sum;
            },

            getTotalWeight(){
                let sum = 0;
                for (let step = 0; step < this.$store.state.A.cargo.length; step++) {
                    sum += Number(this.$store.state.A.cargo[step].weight)
                }
                return sum;
            },

            getTotalVolume(){
                let sum = 0;
                for (let step = 0; step < this.$store.state.A.cargo.length; step++) {
                    sum += Number(this.$store.state.A.cargo[step].volume)
                }
                return sum;
            }

        }
    }

</script>



<style scoped>
    .calcRate {
        margin: 25px;
        text-align: right;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .calcRateButton{
        background-color: #ff0000;
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .calcRateButton:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
    }


</style>