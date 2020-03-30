<template>
    <form>
        <div class="product-info">
<!--            <p class="product-title">-->
<!--                Type of products-->
<!--            </p>-->
            <div class="form-row" v-for="(product, index) in cargo" :key="index">
                <div class="form-labels">
                    <label>
                        Quantity
                        <input v-model="product.quantity" :name="`cargo[${index}][quantity]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="#">
                    </label>

                    <label>
                        Weight
                        <input v-model="product.weight" :name="`cargo[${index}][weight]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="t">
                    </label>

                    <label>
                        Volume
                        <input v-model="product.volume" :name="`cargo[${index}][volume]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="m">
                    </label>

                    <button @click="removeProduct(index)" type="button" class="button circle cross" style="background-color: #f1f9ff;"></button>
                </div>

            </div>

            <div class="form-add">
                <button @click="addProduct" type="button" class="button circle plus"></button>
                Add product
            </div>

<!--            <div class="form-submit">-->
<!--                <button @click="productInfo" type="button" class="prodButton">Product Information</button>-->
<!--            </div>-->

        </div>
    </form>
</template>




<script>

    export default {
        name: "ProductInput",

        data: () => ({
            cargo: [
                {
                    quantity: "",
                    weight: "",
                    volume: ""
                }
            ]
        }),


        methods: {
            addProduct() {
                this.cargo.push({
                    quantity: "",
                    weight: "",
                    volume: ""
                })
            },

            removeProduct(index) {
                this.cargo.splice(index, 1);
            },

            productInfo (){
                const data = {
                    cargo: this.cargo
                }
                alert(JSON.stringify(data, null, 2))
            },

            getQuantity(){
                // eslint-disable-next-line no-unused-vars
                let sum = 0;
                for (let step = 0; step < this.cargo.length; step++) {
                    sum += Number(this.cargo[step].quantity)
                }
                return sum;
            },

            getWeight(){
                // eslint-disable-next-line no-unused-vars
                let sum = 0;
                for (let step = 0; step < this.cargo.length; step++) {
                    sum += Number(this.cargo[step].weight)
                }
                return sum;
            },

            getVolume(){
                // eslint-disable-next-line no-unused-vars
                let sum = 0;
                for (let step = 0; step < this.cargo.length; step++) {
                    sum += Number(this.cargo[step].volume)
                }
                return sum;
            }

        }


    };

</script>



<style scoped>
    .product-info {
        margin: 25px;
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .product-info > div {
        margin-top: 20px;
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

    input {
        background: #F1F9FF;
        width: 50px;
        height: 25px;
        border: solid #007feb;
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;
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


    .submit {
        margin: 15px;
        width: 90%;
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