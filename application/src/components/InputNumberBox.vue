<template>
    <div>
        <input id="numberBox" :class="valid ? 'valid' : 'invalid'" type="number" v-model="lastInput" v-on:input="processInput">
        <label for="numberBox"/>
    </div>
</template>

<script>
    export default {
        name: "InputNumberBox",
        props: {
            default: Number,
            error: Function,
            min: Number,
            max: Number,
        },
        data: function() {
            return {
                lastInput : 0,
                value : 0,
                valid : true,

            }
        },
        mounted() {
            // Set the value to the give default.
            this.value = this.default;
            this.lastInput = String(this.value);
        },
        methods: {
            /**
             * This method processes the input everytime it is updated.
             */
            processInput : function (){
                this.value = Number(this.lastInput);
                this.valid = ("".localeCompare(this.lastInput) !== 0);
                if (this.valid) {
                    this.boundInput();
                    if (this.error(this.value)){
                        this.valid = false;
                    } else {
                        this.$emit("change", this.value);
                    }
                }
            },

            /**
             * This method bounds between the given min and max of this field.
             */
            boundInput : function (){
                if (this.value > this.max){
                    this.value = this.max;
                    this.lastInput = String(this.value);
                } else if (this.value < this.min){
                    this.value = this.min;
                    this.lastInput = String(this.value);
                }
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