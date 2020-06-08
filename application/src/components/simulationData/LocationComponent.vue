<template>
    <div id="component">
        <DataPosition :text="text" v-on:extend="extend()" v-on:shrink="shrink()"/>
        <input ref="input" class="input" v-model="this.location" readonly>
    </div>
</template>

<script>
    import DataPosition from "@/components/simulationData/DataPosition";
    export default {
        name: "LocationComponent",
        components : {
          DataPosition
        },
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
            extend(){
                this.inputCollapsed = false;
                this.$refs["input"].style.height = "1.5em";
                this.computeLocation();
            },
            shrink() {
                this.inputCollapsed = true;
                this.$refs["input"].style.height = "0em";
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
    .input{
        width: 100%;
        height: 0;
        background-color: white;
        border: solid 1px #007FEB;
        margin-top: 5%;
        transition: height 0.25s;
        font-size: 100%;
        text-align: left;
        overflow: auto;
        overflow-y:hidden;
        padding: 0;
    }
</style>