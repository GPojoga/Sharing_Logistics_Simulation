<template>
    <form>
        <div class="product-info">
            <p class="product-title">
                Type of products
            </p>
            <div class="form-row" v-for="(product, index) in cargo" :key="index">
                <div class="form-labels">
                    <label>
                        Quantity
                        <input v-model="product.quantity" :name="`cargo[${index}][quantity]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="#" v-on:input = "sentInput">
                    </label>

                    <label>
                        Weight
                        <input v-model="product.weight" :name="`cargo[${index}][weight]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="t" v-on:input = "sentInput">
                    </label>

                    <label>
                        Volume
                        <input v-model="product.volume" :name="`cargo[${index}][volume]`" type="number" min="0" oninput="this.value = Math.abs(this.value)" class="form-input" placeholder="m^3" v-on:input = "sentInput">
                    </label>

                    <button @click="removeProduct(index)" type="button" class="removeButton">X</button>
                </div>

            </div>

            <div class="form-add">
                <button @click="addProduct" type="button" class="addButton">Add product</button>
            </div>

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
            sentInput(){
                this.$store.state.A.cargo = this.cargo;
            },

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
                };
                alert(JSON.stringify(data, null, 2))
            },

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

    .form-input > input{
        background: #F1F9FF;
        width: 42px;
        height: 21px;
        border: 3px solid #1187EC;
        border-radius: 4px;

        /* Remove the scroll bar in Firefox */
        -moz-appearance: textfield;

        /* Change the text; font, color, size, ect... */
        text-align: center;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }

    .product-title{
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    .removeButton{
        font-size: 21px;
        border-radius: 70%;
        background-color: #F1F9FF;
        border: 3px solid #1187EC;

        text-align: center;
        color: #1187EC;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;


    }

    .removeButton:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
    }

    .addButton{
        background-color: #1187EC;
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .addButton:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
    }

    .prodButton{
        background-color: #1187EC;
        border: none;
        color: white;
        padding: 15px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .prodButton:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
    }



    input {
        background: #F1F9FF;
        width: 50px;
        height: 21px;
        border: 3px solid #1187EC;
        border-radius: 4px;
        margin-right: 5px;
        display: inline-block;
        position: relative;
        top: 1px;


        text-align: center;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
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
</style>