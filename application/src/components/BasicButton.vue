<template>
    <button class="basicButton" :class="{ solid : solidButton }" v-on:click="$emit('click')">
        <slot>TODO</slot>
    </button>
</template>

<script>
    export default {
        name: "BasicButton",
        props: [
            'layout'
        ],
        computed: {
            solidButton() {
                return (this.layout === 'solid');
            }
        }
    }
</script>

<style scoped>
    .basicButton {
        /*line-height: 10px;*/
        height: 33px;
        background-color: white;
        color: #007feb;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        border: 0.5px solid #007feb;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        /*padding: 15px 10px;*/
        text-align: center;
    }

    .basicButton:hover {
        /*box-shadow: 0 3px 8px 2px rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);*/
        background-color: #e1f0ff;
        cursor: pointer;
    }

    .basicButton:focus {
        outline: 0;
        background-color: grey;
        color: white;
    }

    .solid {
        background-color: #007feb;
        color: white;
    }

    .solid:hover {
        background-color: #74b3ff;
        border-color: #c3ddff;
    }

    .solid:focus {
        background-color: #ebb90a;
    }
</style>