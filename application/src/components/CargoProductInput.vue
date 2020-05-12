<template>
    <div class="good">
        <div class="header">
            <span>
                Product {{index + 1}}
            </span>
            <div class="remove">
                <button @click="removeProduct" type="button" class="button circle cross"/>
            </div>
        </div>

        <div class="numberFields">
            <div class="column" v-for="input in inputs" :key="input.name">
                <p class="fieldText" :class="{error: input.field.error}">
                    {{input.name}}
                </p>
                <InputNumberBox :field="input.field" :forward="input.forward" :setter="input.setter" :placeholder="input.unit"/>
            </div>
        </div>

        <LocationInput :location="product.pickupLocation" label="From" :setter="'setGoodPickupLocation'" :forward="{index : this.index}"/>
        <LocationInput :location="product.deliveryLocation" label="To" :setter="'setGoodDeliveryLocation'" :forward="{index : this.index}"/>
    </div>
</template>

<script>
    import LocationInput from "./InputLocation";
    import InputNumberBox from "./InputNumberBox";

    export default {
        name: "CargoProductInput",
        components : {
            InputNumberBox,
            LocationInput
        },
        props: {
            product : Object,
            index : Number,
        },
        computed: {
            inputs : function () {
                return [
                    {
                        name: "Quantity",
                        unit: "#",
                        setter: "setGoodQuantity",
                        field: this.product.quantity,
                        forward: {index: this.index}
                    },
                    {
                        name: "Weight",
                        unit: "kg",
                        setter: "setGoodWeight",
                        field: this.product.weight,
                        forward: {index: this.index}
                    },
                    {
                        name: "Volume",
                        unit: "m^3",
                        setter: "setGoodVolume",
                        field: this.product.volume,
                        forward: {index: this.index}
                    }
                ]
            }
        },
        methods: {
            /**
             * This method removes a product from the list of goods in the store.
             */
            removeProduct() {
                let payload = {index : this.index};
                this.$store.commit("removeGood" ,payload);
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 40px;
    }

    span {
        margin: 10px 0;
        float: left;
        text-align: left;
        color: #007FEB;
        font-weight: bold;
        font-size: 100%;
    }

    .good {
        margin-bottom: 10px;
        border: 2px solid #007feb;
        border-radius: 5px;
        padding: 10px 15px;
    }

    .numberFields {
        column-count: 3;
    }

    .error {
        color: red;
    }

    .column {
        float: left;
        margin: 2.5%;
    }

    .fieldText {
        text-align: center;
        margin: 0;
    }

    /* Button to remove this good */
    .remove {
        float: right;
    }

    .button {
        background-color: #f1f9ff;
        border: none;
        color: white;
        padding: 15px 10px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .button:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        cursor: pointer;
    }

    /* Circle class */
    .circle {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        position: relative;
        margin: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .circle:before,
    .circle:after {
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    /* Cross in circle */
    .circle.cross:after,
    .circle.cross:before {
        background: #007feb;
        margin: auto 8px;
        height: 2px;
        transform:rotateZ(45deg);
    }
    .circle.cross:after {
        transform:rotateZ(-45deg);
    }
</style>