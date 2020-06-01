<template>
    <div :title="info">
        <label>
            <basic-input class="numberBox"
                   :class="isValid ? 'valid' : 'invalid'"
                   type="text"
                   v-model="lastInput"
                   :placeholder="placeholder"
                   :disabled='isDisabled'
                   v-on:input="processInput"/>
        </label>
    </div>
</template>

<script>
    import BasicInput from "./BasicInput";
    export default {
        name: "InputNumberBox",
        components: {BasicInput},
        props: {
            field: Object,
            forward: Object,
            setter: String,
            placeholder: String,
        },
        data: function() {
            return {
                lastInput : 0,
            }
        },
        mounted() {
            // Set the value to the give what is in the state.
            this.lastInput = this.field.value;
        },
        computed: {
            isValid : function () {
                return !(this.field.error);
            },
            info : function () {
                return this.field.message;
            },
            classes : function () {
                return {
                    'numberBox': true,
                    'valid': this.isValid(),
                    'invalid': !this.isValid(),
                }
            },
            isDisabled : function() {
                return this.$store.getters.isRunning;
            }
        },
        methods: {
            /**
             * This method processes the input every time it is updated.
             */
            processInput : function (){
                let payload = this.forward;
                payload.value = this.lastInput;

                this.$store.commit(this.setter, payload);
            }
        }
    }
</script>

<style scoped>
    /* Draw input box */
    .numberBox {

        /* Remove the scroll bar in Firefox */
        -moz-appearance: textfield;

        /* Change the text; font, size, ect... */
        text-align: center;
        font-size: 90%;

        width: 100%;
    }

    /* Change the font when the input is valid */
    .valid {
        background: #f1f9ff;
        border-color: #1187EC;
        color: #007FEB;
    }

    /* Change the font when the input is invalid */
    .invalid {
        background: #fff5fa;
        border-color: #fb2223;
        color: #fc3131;
     }

    /* Remove online around input box when selected */
    .numberBox:focus, input:focus{
        outline: none;
    }

    /* Remove the scrollbar that appears when the input box is selected */
    .numberBox::-webkit-outer-spin-button, #numberBox::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Style the placeholder text */
    ::placeholder {
        color: red;
        opacity: 1;
    }

    /* Internet Explorer 10-11 & Microsoft Edge */
    :-ms-input-placeholder {
        color: red;
    }
</style>