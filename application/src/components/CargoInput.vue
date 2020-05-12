<template>
    <div class="product-info">
        <div v-for="(product, index) in cargo" :key="index">
            <CargoProductInput :product="product" :index="index"/>
        </div>

        <div>
            <button @click="addProduct" type="button" class="button circle plus"/>
            Add product
        </div>
    </div>
</template>


<script>
    import CargoProductInput from "./CargoProductInput";
    export default {
        name: "ProductInput",
        components: {CargoProductInput},
        computed: {
            cargo() {
                return this.$store.getters.goods;
            },
        },
        methods: {
            /**
             * This method add a new good to the list of goods in the store.
             */
            addProduct() {
                this.$store.commit('addNewGood');
            },
        }
    }
</script>



<style scoped>
    .product-info {
        padding: 10px;
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
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

    /* Cross in circle */
    .circle.cross:after,
    .circle.cross:before{
        background: #007feb;
        margin: auto 8px;
        height: 2px;
        transform:rotateZ(45deg);
    }
    .circle.cross:after{
        transform:rotateZ(-45deg);
    }
</style>