<template>
    <div id="checkBoxBackground">

        <!-- When the input is clicked then the checkSelection() method is called --->
        <input type="checkbox" :id="checkboxId" @click="checkSelection">
        <label :for="checkboxId">
            {{labelText}}
        </label>

    </div>
</template>

<script>
    export default {
        name: "SelectorCheckBox",
        props: {
            // A unique string to reference the checkbox.
            "checkboxId": String,

            // String of text that should be clickable next to the button.
            "labelText": String,
        },
        data: function () {
            return{
                // Keeps track of if the checkbox is currently checked.
                isChecked: false
            }
        },
        methods: {
            /**
             * This method emits an event when the checkbox is (un)checked.
             */
            checkSelection: function () {
                this.isChecked = !this.isChecked;
                this.$emit("boxChecked", this.isChecked);
            }
        }
    }
</script>

<style scoped>
    /* Stylize the background of the checkbox and label */
    #checkBoxBackground {
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
    #checkBoxBackground input[type=checkbox] {
        display: none;
    }

    /* Change the mouse pointer when it hovers the label */
    #checkBoxBackground label {
        cursor: pointer;
    }

    /* Draw Custom checkbox */
    #checkBoxBackground label:after {
        display: inline-block;
        width: 21px;
        height: 21px;

        content: "\00a0";
        text-align: center;
        border: 3px solid #7FC4FD;
        border-radius: 4px;
    }

    /* Add a check-mark (✓) when the vehicle selection entry is selected */
    #checkBoxBackground input:checked ~ label:after {
        content: "\2713";
    }

    /* When hovering over checkbox background color is light grey */
    #checkBoxBackground label:hover::after{
        background: #f2f2f2;
        cursor: pointer;
    }
</style>