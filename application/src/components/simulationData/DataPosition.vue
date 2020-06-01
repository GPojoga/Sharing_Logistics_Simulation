<template>
    <div id="content">
        {{text}}
        <div id="collapseController">
            <button id="collapseButton" v-on:click="collapse()">
                <svg ref="collapseArrow" id="collapseArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323 213">
                    <path transform= "rotate(90 162.54376220703122,104.99998474121091) " d="m258.8,122l-136,136c-9.4,9.4 -24.6,9.4 -33.9,0l-22.6,-22.6c-9.4,-9.4 -9.4,-24.6 0,-33.9l96.4,-96.4l-96.4,-96.4c-9.4,-9.4 -9.4,-24.6 0,-33.9l22.5,-22.8c9.4,-9.4 24.6,-9.4 33.9,0l136,136c9.5,9.4 9.5,24.6 0.1,34z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DataPosition",
        props : {
            text : String,
        },
        data() {
            return {
                collapsed : true,
            }
        },
        methods : {
            collapse() {
                if(this.collapsed){
                    this.$refs["collapseArrow"].style.transform = "rotate(180deg)";
                    this.$emit("extend");
                    this.collapsed = false;
                }else {
                    this.$refs["collapseArrow"].style.transform = "rotate(0deg)";
                    this.$emit("shrink");
                    this.collapsed = true;
                }
            },
        }
    }
</script>

<style scoped>
    #collapseController{
        opacity: 0.9;
        width: 14%;
        height: 5%;
        display: inline-block;
    }

    #collapseButton{
        z-index: -1;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: white;
        border-radius: 2px;
        cursor: pointer;
        padding: 0;
    }

    #collapseArrow{
        width : 50%;
        height : 50%;
        fill: #007FEB;
        transition: transform 0.5s;
    }

    button:focus{
        outline: none;
    }

    button::-moz-focus-inner {
        border: 0;
    }
</style>