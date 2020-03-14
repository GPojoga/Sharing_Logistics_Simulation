<template>
    <div id="vehicleSelectorField">
        <div id="selectionField">
            <input type="checkbox" v-model="isSelected" :id="checkboxID">
            <label :for="checkboxID">
                {{vehicleDetails}}
            </label>
        </div>

        <div id="inputField" v-if="isSelected">
            <input id="numberBox" type="number" v-model="lastInputQuantity" min="0" oninput="this.value = Math.abs(this.value)">
            <label for="numberBox"></label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VehicleSelectorEntry",
        props: ["vehicleDetails"],
        data: function () {
            return {
                isSelected : false,
                lastInputQuantity : 1,
                checkboxID : "checkbox" + this.vehicleDetails.split(" ").join("")
            }
        },
        methods: {
            /**
             * @returns {number} The number of selected trucks in this VehicleSelectorEntry instance.
             */
            getQuantity: function(){
                return (this.isSelected ? Number(this.lastInputQuantity) : 0);
            },
        },
    }
</script>

<style scoped>
    /*Stylize the background field */
    #vehicleSelectorField {
        width: 100%;
        height: 30px;
    }

    /* Stylize the selection field */
    #selectionField {
        line-height: 25px;
        width: 50%;
        float: left;

        /* Change the text; font, color, size, ect... */
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    /* Hide the default checkbox */
    #selectionField input[type=checkbox] {
        display: none;
    }

    /* Change the mouse pointer when it hovers the label */
    #selectionField label {
        cursor: pointer;
    }

    /* Draw Custom checkbox */
    #selectionField label:after {
        display: inline-block;
        width: 21px;
        height: 21px;

        content: "\00a0";
        text-align: center;
        border: 3px solid #7FC4FD;
        border-radius: 4px;
    }

    /* Add a check-mark (✓) when the vehicle selection entry is selected */
    #selectionField input:checked ~ label:after {
        content: "\2713";
    }

    /* When hovering over checkbox background color is light grey */
    #selectionField label:hover::after{
        background: #f2f2f2;
        cursor: pointer;
    }

    /* Stylize the input field */
    #inputField {
        line-height: 25px;
        width: 50%;
        float: left;
        text-align: left;
    }

    /* Draw input box */
    #numberBox {
        background: #F1F9FF;
        width: 42px;
        height: 21px;
        border: 3px solid #1187EC;
        border-radius: 4px;
        -moz-appearance: textfield;

        /* Change the text; font, color, size, ect... */
        text-align: center;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    /* Remove online around input box when selected */
    #numberBox:focus, input:focus{
        outline: none;
    }

    /* Remove the scrollbar that appears when the input box is selected */
    #numberBox::-webkit-outer-spin-button, #numberBox::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>