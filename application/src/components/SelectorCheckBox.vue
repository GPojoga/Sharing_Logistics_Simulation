<template>
    <div class="temp">

        <div class="tag">
            {{labelText}}
        </div>
        <!-- When the input is clicked then the checkSelection() method is called --->
        <input type="checkbox" :id="checkboxId" @click="checkSelection" class="regular-checkbox"><label :for="checkboxId"></label>

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
    .checkBoxBackground {
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
    .checkBoxBackground input[type=checkbox] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Change the mouse pointer when it hovers the label */
    .checkBoxBackground label {
        cursor: pointer;
        width: 20px;
        display: inline-block;
    }

    /* Draw Custom checkbox */
    .checkBoxBackground label:after {
        /*display: inline-block;*/
        top: 0;
        left: 0;
        width: 21px;
        height: 21px;

        content: "\00a0";
        text-align: center;
        border: 3px solid #7FC4FD;
        border-radius: 4px;
    }

    /* Add a check-mark (✓) when the vehicle selection entry is selected */
    .checkBoxBackground input:checked ~ label:after {
        content: "\2713";
    }

    /* When hovering over checkbox background color is light grey */
    .checkBoxBackground label:hover::after{
        background: #f2f2f2;
        cursor: pointer;
    }





    .temp {
        text-align: left;
        width: 50%;
    }

    label {
        display: inline;
    }

    .regular-checkbox {
        display: none;
    }

    .regular-checkbox + label {
        background-color: #fafafa;
        border: 3px solid #7FC4FD;
        padding: 9px;
        border-radius: 3px;
        display: inline-block;
        position: relative;
    }

    .regular-checkbox:checked + label:after {
        content: '\2714';
        font-size: 14px;
        position: absolute;
        top: 0px;
        left: 3px;
        color: #007FEB;
    }

    .regular-checkbox:hover::after{
        background: #f2f2f2;
        cursor: pointer;
    }

    .tag {
        width: 135px;
        position: relative;
        top: 5px;
        font-weight: bold;
        text-align: left;
        display: block;
        float: left;
        margin-right: 10px;
    }

</style>