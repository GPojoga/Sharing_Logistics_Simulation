<template>
    <button class="roundButton" :class="isDisable ? 'disabled' : 'enabled'" @click="buttonPressed" :disabled="isDisable">
        {{text}}
    </button>
</template>

<script>
    export default {
        name: "RoundButton",
        props: {
            text: String,
            isDisable: Boolean,
        },
        methods : {
            /**
             * This method is called when the button is pressed.
             */
            buttonPressed: function () {
                this.$emit("pressed");
            }
        }
    }
</script>

<style scoped>
    .roundButton {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        padding: 0;
        margin: 0;

        text-align: center;
        color: white;
        text-decoration: none;
        font-size: 30px;

        cursor: pointer;
        outline: none;

        border: none;
    }

    .enabled {
        background-color: #007feb;
    }

    .disabled {
        background-color: #c4c4c4;
    }
</style>