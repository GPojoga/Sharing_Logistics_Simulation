<template>
    <div id="goodComponent">
        <img id="image" v-bind:src="goodImage" alt="goods image"/>
        <div id="preview">
            <LocationComponent text="Pick up location" :data="good.pickUp"/>
            <LocationComponent text="Delivery location" :data="good.delivery"/>
            <DataPosition id="dataPosition" text="More" v-on:extend="extend()" v-on:shrink="shrink()"/>
        </div>
        <div id="goodDetails" ref="goodDetails">
            <p class="entry"> Current status : {{currentStatus}}</p>
            <p class="entry"> Transit time : {{transitTime}}</p>
            <p class="entry"> Delivery time : {{deliveryTime}}</p>

        </div>
    </div>
</template>

<script>
    import Good from "@/classes/goods/Good.js"
    import LocationComponent from "@/components/simulationData/LocationComponent";
    import DataPosition from "@/components/simulationData/DataPosition";

    export default {
        name: "GoodComponent",
        components:{
            LocationComponent,
            DataPosition
        },
        props:{
            good : Good,
        },
        computed:{
            goodImage : function(){
                return "assets/goods.svg";
            },
            currentStatus : function () {
                if(this.good.deliveryTime !== null){
                    return "Delivered";
                }
                if(this.good.pickupTime !== null){
                    return "In transit";
                }
                return "Waiting to be picked up";
            },
            transitTime : function () {
                let transit = this.good.getTransitTime();
                if(transit === null) {
                    return "Not available";
                }
                return this.printTime(transit);
            },
            deliveryTime : function () {
                let delivery = this.good.getDeliveryTime();
                if(delivery === null){
                    return "Not available";
                }
                return this.printTime(delivery);
            }
        },
        methods:{
            extend(){
                this.$refs["goodDetails"].style.height = this.$refs["goodDetails"].scrollHeight + "px";
            },
            shrink(){
                this.$refs["goodDetails"].style.height = "0";
            },
            printTime(seconds) {
                seconds = Math.round(seconds);

                const hours = Math.floor(seconds / 3600);
                seconds = seconds - hours*3600;

                const minutes = Math.floor(seconds / 60);
                seconds = seconds - minutes*60;

                return hours + ' h ' + minutes + ' m ' + seconds + ' s';
            }
        }
    }
</script>

<style scoped>
    #goodComponent{
        width : 90%;
        position: relative;
        text-align: left;
        left: 2%;
        margin: 0;
        border: solid rgba(0, 127, 235, 0.2);
        border-width: 0 0 1px 0;
        padding-left: 3%;
        padding-right: 3%;
    }
    #image{
        width: 20%;
        height : 20%;
        padding: 3%;
        display: inline-block;
    }
    #dataPosition{
        padding: 2%;
        margin: 0;
        font-size: 100%;
    }
    #preview{
        display: inline-block;
        position: relative;
        padding: 3%;
        width: 68%;
        top: 1px;
    }
    #goodDetails{
        width: 100%;
        height: 0;
        background-color: white;
        border: solid 1px #007FEB;
        margin-bottom: 5%;
        transition: height 0.5s;
        font-size: 100%;
        text-align: left;
        overflow: hidden;
        padding: 0;
    }
    .entry{
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 2%;
    }
</style>