<template>
    <div :title="info">
        <input id="numberBox" :class="isValid ? 'valid' : 'invalid'" type="text" v-model="lastInput" v-on:input="processInput"/>
        <label for="numberBox"/>
    </div>
</template>

<script>
    export default {
        name: "InputNumberBox",
        props: {
            field: Object,
            forward: Object,
            setter: String
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
    #numberBox {
        background: #ffffff;
        width: 50%;
        height: 16px;
        border-radius: 4px;

        /* Remove the scroll bar in Firefox */
        -moz-appearance: textfield;

        /* Change the text; font, size, ect... */
        text-align: center;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    /* Change the font when the input is valid */
    .valid {
        border: 3px solid #1187EC;
        color: #007FEB;
    }

    /* Change the font when the input is invalid */
    .invalid {
         border: 3px solid #ec2720;
         color: #eb0203;
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