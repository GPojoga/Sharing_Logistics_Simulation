<template>
    <div class="vehicleSelectorEntry">

        <SelectorCheckBox :checkbox-id="checkboxID" :label-text="entryTitle" @boxChecked="updateSelectEntry" />

        <!-- If the vehicle entry is selected add the option to change the quantity -->
        <div id="inputFieldBackground" v-if="isSelected">
            <input id="inputNumberBox" type="number" v-model="lastQuantity" min="0" oninput="this.value = Math.abs(this.value)" v-on:input="sendInput">
            <label for="inputNumberBox" />
        </div>

    </div>
</template>

<script>
    import SelectorCheckBox from "./SelectorCheckBox";
    export default {
        name: "VehicleSelectorEntry",
        components: {SelectorCheckBox},
        props: ["entryTitle"],
        data: function () {
            return {
                // Keeps track of if the field is selected or not.
                isSelected : false,

                // Keeps track of what was the user's last input in the number field.
                lastQuantity : 1,

                // Generate a unique id for the checkbox based on the label text.
                checkboxID : "checkbox" + this.entryTitle.split(" ").join("")
            }
        },
        methods: {
            /**
             * @returns {number} The number of selected trucks in this VehicleSelectorEntry instance.
             */
            getQuantity: function(){
                return (this.isSelected ? Number(this.lastQuantity) : 0);
            },
            /**
             * When the checkbox is checked the entry is selected.
             */
            updateSelectEntry: function (isChecked) {
                this.isSelected = isChecked;
                this.sendInput();
            },
            /**
             * This method emits a message when the input is changed.
             */
            sendInput() {
                this.$emit("input");
            }
        },
    }
</script>

<style scoped>
    /* Stylize the background field */
    .vehicleSelectorEntry {
        width: 100%;
        height: 32px;
        display: inline-block;
    }

    /* Stylize the input field */
    #inputFieldBackground {
        line-height: 27px;
        width: 50%;
        float: right;
        text-align: left;
    }

    /* Draw input box */
    #inputNumberBox {
        background: #F1F9FF;
        width: 42px;
        height: 21px;
        border: 3px solid #1187EC;
        border-radius: 4px;

        /* Remove the scroll bar in Firefox */
        -moz-appearance: textfield;

        /* Change the text; font, color, size, ect... */
        text-align: center;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    /* Remove online around input box when selected */
    #inputNumberBox:focus, input:focus{
        outline: none;
    }

    /* Remove the scrollbar that appears when the input box is selected */
    #inputNumberBox::-webkit-outer-spin-button, #inputNumberBox::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>