<template>
    <div class="calcRate">
        <div>
            <button @click="calculateTraditonal" type="button" class="calcRateButton">Traditional Rate</button>
        </div>
        <div>
            <button @click="calculateSharing" type="button" class="calcRateButton">Sharing Rate</button>
        </div>
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
            calculateTraditonal(){
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
        background-color: #ff0000;
        line-height: 10px;
        border: none;
        border-radius: 5px;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .calcRateButton:hover{
        box-shadow: 0 3px 8px 2px rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
    }


</style>