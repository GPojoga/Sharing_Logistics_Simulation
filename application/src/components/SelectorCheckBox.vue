<template>
    <div class="checkboxHolder">

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
    .checkboxHolder {
        text-align: left;
        width: 50%;
        display: inline-block;
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