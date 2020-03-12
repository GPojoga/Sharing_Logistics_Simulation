<template>
    <div>
        <p id="entryText">
            <label id="entryContainer">
                {{vehicleDetails}}
                <input type="checkbox" v-model="isSelected">
                <span id="entryCheckbox"></span>
            </label>

            <template v-if="isSelected">
                <input type="number" v-model="lastInputQuantity" min="0" oninput="this.value = Math.abs(this.value)">
            </template>
        </p>
    </div>
</template>

<script>
    export default {
        name: "VehicleSelectorEntry",
        props: ["vehicleDetails"],
        data: function () {
            return {
                isSelected : false,
                lastInputQuantity : 1
            }
        },
        methods: {
            getQuantity: function(){
                return (this.isSelected ? Number(this.lastInputQuantity) : 0)
            }
        }
    }
</script>

<style scoped>
    #entryText {
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    #entryContainer {
        position: relative;
        cursor: pointer;
    }

    /* Hide the default checkbox */
    #entryContainer input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Custom checkbox */
    #entryCheckbox {
        display: inline-block;
        position: relative;

        top: 8px;
        left: 0;
        width: 21px;
        height: 21px;

        background-color: #ffffff;
        border: 3px solid #7FC4FD;
        border-radius: 4px;
    }

    #entryContainer input:checked ~ #entryCheckbox {
        background-color: #2196F3;
    }
</style>