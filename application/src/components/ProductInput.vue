<template>
    <div class="product-info">
        <div v-if="!productsValid">
            <p id="errorMessage">
                Invalid input, make sure that all product's fields are be filled in.
                As well as: 0kg &lt; Weight &lt; 4700 and: 0 &lt; Volume &lt; 8.925 for all products.
            </p>
        </div>

        <div class="form-row" v-for="(product, index) in cargo" :key="index">
            <p> Product {{index + 1}} </p>
            <div class="labels">
                <label>Quantity</label>
                <label>Weight</label>
                <label>Volume</label>
            </div>
            <div class="form-labels">
                <input v-model="product.quantity"
                       :name="`cargo[${index}][quantity]`"
                       type="number"
                       min="0"
                       oninput="this.value = Math.abs(this.value)"
                       class="form-input"
                       placeholder="#"
                       @input="setUpdate">
                <input v-model="product.weight"
                       :name="`cargo[${index}][weight]`"
                       type="number"
                       min="0"
                       oninput="this.value = Math.abs(this.value)"
                       class="form-input"
                       placeholder="kg"
                       @input="setUpdate">
                <input v-model="product.volume"
                       :name="`cargo[${index}][volume]`"
                       type="number"
                       min="0"
                       oninput="this.value = Math.abs(this.value)"
                       class="form-input"
                       placeholder="m^3"
                       @input="setUpdate">

                <button @click="removeProduct(index)"
                        type="button"
                        class="button circle cross"
                        style="background-color: #f1f9ff;"
                        @input="setUpdate"></button>
            </div>
            <LocationInput v-model="product.from"
                           :index="2*(index+1)"
                           location-input-label="From"
                           @input="$emit('journeyChange')"/>
            <LocationInput v-model="product.to"
                           :index="2*(index+1)+1"
                           location-input-label="To"
                           @input="$emit('journeyChange')"/>
        </div>

        <div class="form-add">
            <button @click="addProduct" type="button" class="button circle plus"></button>
            Add product
        </div>
    </div>
</template>


<script>
    import LocationInput from "./baseComponents/LocationInput";
    export default {
        name: "ProductInput",
        components: { LocationInput },
        props: {
            locationsValid : Boolean,
            dateValid : Boolean,
            productsValid : Boolean,
        },

        mounted() {
            this.addProduct();
        },

        computed: {
            cargo() {
                return this.$store.state.A.cargo;
            }
        },

        methods: {
            addProduct() {
                this.$store.dispatch('addProduct');
            },
            removeProduct(index) {
                this.$store.dispatch('removeProduct', index);
                this.setUpdate();
            },
            setUpdate(){
                this.$emit("productChange");
            }
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

    .product-info > .form-row {
        margin-bottom: 8px;
        padding: 15px;
        border: 2px solid #007feb;
        border-radius: 5px;
    }

    .product-title{
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

    .labels {
        width: 100%;
    }

    .labels > label {
        width: 90px;
    }

    input {
        background: #F1F9FF;
        width: 60px;
        height: 25px;
        border: solid #007feb;
        border-radius: 5px;
        margin-right: 30px;
        display: inline-block;
        position: relative;
        top: 1px;

        text-align: center;
        color: #007feb;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    input::placeholder{
        color: #7FC4FD
    }

    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    label {
        display: inline-block;
        font-weight: bold;
        height: fit-content;
        width: 90px;
        margin-right: 5px;
    }

    /* Style the text in the error message */
    #errorMessage {
        text-align: left;
        font-weight: normal;
        color: #b20207;
        font-size: 60%;
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