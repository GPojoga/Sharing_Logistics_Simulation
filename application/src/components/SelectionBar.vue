<template>
    <div id="bar">
        <div id="wrapper">
            <button class="choice" ref="man" @click="swapTo('Manual')"> Manual </button>
            <button class="choice" ref="rand" @click="swapTo('Random')"> Random </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectionBar",
        props :{
            selected : String,
        },
        data(){
          return {
              inactiveColor : "rgb(0,25,194)",
              activeColor : "rgba(0,57,255,0.56)",
          }
        },
        mounted(){
          this.swapTo(this.selected);
        },
        methods : {
          swapTo(type){
              if (type === "Random"){
                  this.$refs["rand"].style.background = this.activeColor;
                  this.$refs["man"].style.background = this.inactiveColor;
              } else {
                  this.$refs["man"].style.background = this.activeColor;
                  this.$refs["rand"].style.background = this.inactiveColor;
              }
          }
        }
    }
</script>

<style scoped>
    #bar{
        background-color: #007feb;
        width : 100%;
        height: 10%;
        position: relative;
    }

    #wrapper{
        position: absolute;
        bottom: 0;
        height: 60%;
        right: 20%;
        left: 20%;
        border: none;
        margin: auto;
        background-color: white;
    }
    .choice{
        border: none;
        color: white;
        text-align: center;
        position: relative;
        display: inline;
        font-size: large;
        height: 100%;
        width: 50%;
    }

</style>