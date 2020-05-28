<template>
    <button class="roundButton circle"
            :class="{
                    disabled : isDisable,
                    enabled : !isDisable,
                    minus : hasMinus,
                    plus : hasPlus
                    }"
            @click="$emit('click')"
            :disabled="isDisable">
        <div v-show="hasPlay || hasPause"
             class="playButton"
             :class="{pause : hasPause}"/>
    </button>
</template>

<script>
    export default {
        name: "BasicRoundButton",
        props: {
            isDisable: Boolean,
            content: String
        },
        computed : {
            hasMinus() {
                return (this.content === 'minus');
            },
            hasPlus() {
                return (this.content === 'plus');
            },
            hasPlay() {
                return (this.content === 'play');
            },
            hasPause() {
                return (this.content === 'pause');
            }
        }
    }
</script>

<style scoped>
    .roundButton {
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

    .enabled:hover {
        background-color: #399beb;
    }

    .disabled {
        background-color: #c4c4c4;
    }

    /* Circle class */
    .circle{
        width: 90%;
        height: 90%;
        border-radius: 50%;
        position: relative;
        margin: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .circle:before,
    .circle:after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    /* Plus in circle */
    .circle.plus:before,
    .circle.plus:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff;
    }
    .circle.plus:before{
        width: 5px;
        margin: 8px auto;
    }
    .circle.plus:after{
        margin: auto 8px;
        height: 5px;
    }

    /* Minus in circle */
    .circle.minus:before,
    .circle.minus:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff;
    }
    .circle.minus:before{
        width: 0;
        /*margin: 8px auto;*/
    }
    .circle.minus:after{
        margin: auto 8px;
        height: 5px;
    }

    /* Play and pause button */
    .playButton {
        width: 24px;
        height: 24px;
        transition: 100ms all ease;
        will-change: border-width;
        margin-left: 12px;
        border-style: solid;
        border-width: 12px 0px 12px 20px;
        box-sizing: border-box;
        border-color: transparent transparent transparent #ffffff;
    }

    .playButton.pause {
        margin-left: 10px;
        border-style: double;
        border-width: 0px 0px 0px 20px;
    }
</style>