<template>
    <div class="good-info">
        <div v-for="(good, index) in cargo" :key="index">
            <CargoGoodInput :good="good" :index="index"/>
        </div>

        <div>
            <button @click="addGood" type="button" class="button circle plus" :disabled='isDisabled'/>
            Add good
        </div>
    </div>
</template>


<script>
    import CargoGoodInput from "./CargoGoodInput";
    export default {
        name: "GoodInput",
        components: {CargoGoodInput},
        computed: {
            cargo() {
                return this.$store.getters.goods;
            },
            isDisabled : function() {
                return this.$store.getters.isRunning;
            }
        },
        methods: {
            /**
             * This method add a new good to the list of goods in the store.
             */
            addGood() {
                this.$store.commit('addNewGood');
            },
        }
    }
</script>



<style scoped>
    .good-info {
        padding: 10px;
        text-align: left;
        font-weight: bold;
    }

    .button{
        background-color: #1187EC;
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .button:hover{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        cursor: pointer;
    }

    /* Circle class */
    .circle{
        width: 30px;
        height: 30px;
        border-radius: 100%;
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
        width: 2px;
        margin: 8px auto;
    }
    .circle.plus:after{
        margin: auto 8px;
        height: 2px;
    }
</style>