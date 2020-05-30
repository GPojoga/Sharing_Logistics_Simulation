<template>
    <div id="component">
        {{text}}
        <div id="collapseController">
            <button id="collapseButton" v-on:click="collapse()">
                <svg ref="collapseArrow" id="collapseArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323 213">
                    <path transform= "rotate(90 162.54376220703122,104.99998474121091) " d="m258.8,122l-136,136c-9.4,9.4 -24.6,9.4 -33.9,0l-22.6,-22.6c-9.4,-9.4 -9.4,-24.6 0,-33.9l96.4,-96.4l-96.4,-96.4c-9.4,-9.4 -9.4,-24.6 0,-33.9l22.5,-22.8c9.4,-9.4 24.6,-9.4 33.9,0l136,136c9.5,9.4 9.5,24.6 0.1,34z"/>
                </svg>
            </button>
        </div>
        <input ref="input" id="input" v-model="this.location" readonly>
    </div>
</template>

<script>
    export default {
        name: "DetailsComponent",
        props :{
            text : String,
            data : Object,
        },
        data(){
          return {
              inputCollapsed : true,
              location : ""
          }
        },
        methods:{
            collapse() {
                this.inputCollapsed = !this.inputCollapsed;
                this.$refs["input"].style.height = this.inputCollapsed ? "0em" : "1.5em";
                this.$refs["collapseArrow"].style.transform = this.inputCollapsed ?
                    "rotate(0deg)" : "rotate(180deg)";
                this.computeLocation();
            },

            computeLocation(){
                if(!this.inputCollapsed){
                    this.reverseGeocode(this.data.lat,this.data.lng)
                        .then(result => this.location = result);
                    setTimeout(this.computeLocation,5000);
                }
            },

            reverseGeocode(lat,lon){
                let url = 'https://nominatim.openstreetmap.org/reverse?format=json';
                url += '&lat=' + lat + '&lon=' + lon;
                return fetch(url)
                        .then(result => result.json())
                        .then(json => {
                            if (json.display_name !== undefined) {
                                return json.display_name;
                            }
                            return '[' + lat +',' + lon + ']';
                        });
            },
        }
    }
</script>

<style scoped>
    #component{
        padding: 2%;
        margin: 0;
        font-size: 100%;
    }
    #input{
        width: 100%;
        height: 0;
        background-color: white;
        border: solid 1px #007FEB;
        margin-top: 5%;
        transition: height 0.5s;
        font-size: 100%;
        text-align: left;
        overflow: auto;
        overflow-y:hidden;
        padding: 0;
    }

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