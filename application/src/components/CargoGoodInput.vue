<template>
    <div class="good">
        <div class="header">
            <span>
                Good {{index + 1}}
            </span>
            <div class="remove">
                <button @click="removeGood" type="button" class="button circle cross" :disabled="isDisabled"/>
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

        <LocationInput :location="good.pickupLocation" label="From" :setter="'setGoodPickupLocation'" :forward="{index : this.index}"/>
        <LocationInput :location="good.deliveryLocation" label="To" :setter="'setGoodDeliveryLocation'" :forward="{index : this.index}"/>
    </div>
</template>

<script>
    import LocationInput from "./LocationInput";
    import InputNumberBox from "./InputNumberBox";

    export default {
        name: "CargoGoodInput",
        components : {
            InputNumberBox,
            LocationInput
        },
        props: {
            good : Object,
            index : Number,
        },
        computed: {
            inputs : function () {
                return [
                    {
                        name: "Quantity",
                        unit: "#",
                        setter: "setGoodQuantity",
                        field: this.good.quantity,
                        forward: {index: this.index}
                    },
                    {
                        name: "Weight",
                        unit: "kg",
                        setter: "setGoodWeight",
                        field: this.good.weight,
                        forward: {index: this.index}
                    },
                    {
                        name: "Volume",
                        unit: "m^3",
                        setter: "setGoodVolume",
                        field: this.good.volume,
                        forward: {index: this.index}
                    }
                ]
            },
            isDisabled : function() {
                return this.$store.getters.isRunning;
            }
        },
        methods: {
            /**
             * This method removes a Good from the list of goods in the store.
             */
            removeGood() {
                let payload = {index : this.index};
                this.$store.commit("removeGood" ,payload);
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 40px;
        width: 100%;
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
        border: solid rgba(0, 127, 235, 0.2);
        border-width: 0 0 1px 0;
        padding: 10px 15px 20px;
    }

    .numberFields {
        column-count: 3;
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