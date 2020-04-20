<template>
    <div id="background">
        <p id="title">
            Constants
        </p>
        <br>
        <div id="box">
            <div id="names">
                <div v-for="(constant, index) in globalConstants" class="constantName" :key="'name'+index">
                    <p class="constantText">
                        {{constant.name}}
                    </p>
                </div>

                <div v-for="truck in trucks" :key="'name'+truck.title">
                    <div class="constantName">
                        <p class="constantText">
                            {{truck.title}}
                        </p>
                    </div>
                    <div class="constantName" v-for="(constant, index) in truck.constants" :key="'name'+truck.title+index">
                        <p class="constantSubText">
                            {{constant.name}}
                        </p>
                    </div>
                </div>
            </div>

            <div id="fields">
                <div v-for="(c, index) in globalConstants" class="constantField" :key="'globalBox'+index">
                    <InputNumberBox :default="c.default" :error="c.error" :min="c.min" :max="c.max" @change="updateGlobal($event, index)"/>
                </div>

                <div v-for="(truck, number) in trucks" :key="'truckBox'+number">
                    <div class="constantField">
                        <br>
                    </div>
                    <div class="constantField" v-for="(c, index) in truck.constants" :key="'truckBox'+number+index">
                        <InputNumberBox :default="c.default" :error="c.error" :min="c.min" :max="c.max" @change="updateTruck($event, number, index)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar">
            <router-link to="/">
                Home
            </router-link>
        </div>
    </div>
</template>

<script>
    import InputNumberBox from "../components/InputNumberBox";
    export default {
        name: "App",
        components: {InputNumberBox},
        methods : {
            /**
             * This method updates the constant in the $store.state at every valid change in the given field.
             * @param value The value the constant has been changed too.
             * @param index The index representing the constant that was changed.
             */
            updateGlobal : function (value, index) {
                if (index === 0){
                    this.$store.state.emissionBurnt = value;
                } else if (index === 1) {
                    this.$store.state.averageSpeed = value;
                }
            },
            updateTruck : function (value, truckId, index) {
                if (index === 0){
                    this.$store.state.truckTypes[truckId].volume = value;
                } else if (index === 1) {
                    this.$store.state.truckTypes[truckId].maxPayload = value;
                } else if (index === 2) {
                    this.$store.state.truckTypes[truckId].consumption0 = value;
                } else if (index === 3) {
                    this.$store.state.truckTypes[truckId].consumption1 = value;
                }
            }
        },
        data : function () {
            return {
                globalConstants : [
                    {
                        index : 0,
                        name : "Emission Burnt Factor",
                        min : 0,
                        max : 100,
                        error : function (value) {
                            return !(0 <= value && value <= 100);
                        },
                        default : this.$store.state.emissionBurnt,
                    },
                    {
                        index : 1,
                        name : "Average Speed",
                        min : 0,
                        max : 1000,
                        error : function (value) {
                            return !(0 < value && value <= 1000)
                        },
                        default : this.$store.state.averageSpeed,
                    }
                ],
                trucks : [
                    {
                        title : "Light Duty Van",
                        number : 0,
                        constants : [
                            {
                                index : 0,
                                name : "Max Volume",
                                min : 0,
                                max : 999,
                                error : function (value) {
                                    return !(0 < value && value <= 999);
                                },
                                default : this.$store.state.truckTypes[0].volume,
                            },
                            {
                                index: 1,
                                name: "Max Payload",
                                min : 0,
                                max : 99999,
                                error : function (value) {
                                    return !(0 < value && value <= 99999);
                                },
                                default : this.$store.state.truckTypes[0].maxPayload,

                            },
                            {
                                index: 2,
                                name : "Empty Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[0].consumption0,
                            },
                            {
                                index: 3,
                                name : "Full Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[0].consumption1,
                            },
                        ]
                    },
                    {
                        title : "Heavy Duty Truck",
                        number : 1,
                        constants : [
                            {
                                index : 0,
                                name : "Max Volume",
                                min : 0,
                                max : 999,
                                error : function (value) {
                                    return !(0 < value && value <= 999);
                                },
                                default : this.$store.state.truckTypes[1].volume,
                            },
                            {
                                index: 1,
                                name: "Max Payload",
                                min : 0,
                                max : 99999,
                                error : function (value) {
                                    return !(0 < value && value <= 99999);
                                },
                                default : this.$store.state.truckTypes[1].maxPayload,

                            },
                            {
                                index: 2,
                                name : "Empty Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[1].consumption0,
                            },
                            {
                                index: 3,
                                name : "Full Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[1].consumption1,
                            },
                        ]
                    },
                    {
                        title : "Train Truck",
                        number : 2,
                        constants : [
                            {
                                index : 0,
                                name : "Max Volume",
                                min : 0,
                                max : 999,
                                error : function (value) {
                                    return !(0 < value && value <= 999);
                                },
                                default : this.$store.state.truckTypes[2].volume,
                            },
                            {
                                index: 1,
                                name: "Max Payload",
                                min : 0,
                                max : 99999,
                                error : function (value) {
                                    return !(0 < value && value <= 99999);
                                },
                                default : this.$store.state.truckTypes[2].maxPayload,

                            },
                            {
                                index: 2,
                                name : "Empty Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[2].consumption0,
                            },
                            {
                                index: 3,
                                name : "Full Fuel Consumption",
                                min : 0,
                                max : 10,
                                error : function (value) {
                                    return !(0 <= value && value <= 10);
                                },
                                default : this.$store.state.truckTypes[2].consumption1,
                            },
                        ]
                    }
                ],
            }
        }
    }
</script>

<style scoped>
    /* Style the background of the page */
    #background {
        background-color : white;
        overflow : hidden;
    }

    /* Style the heading of the page */
    #title {
        font-size: 40px;
        text-align: center;
        margin : 0;
        height : 100%;
    }

    /* Style the container containing the constants */
    #box {
        border-radius: 10px;
        background-color: #f1f9ff;
        height: 450px;
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
    }

    /* Style the left column of the container */
    #names {
        width: 40%;
        height: 100%;
        float: left;
        text-align: left;
        padding: 2.5%;
    }

    /* Style an entry of the name column */
    .constantName {
        width: 100%;
        height: 30px;
        text-align: left;
    }

    /* Style the text in the entry of the name column, making sure there is so padding */
    .constantText {
        margin: 0;
    }

    /* Style the text of less important constants */
    .constantSubText {
        font-size: small;
        margin: 0;
    }

    /* Style the right column of the container of fields */
    #fields {
        width: 40%;
        height: 100%;
        float: right;
        text-align: left;
        padding: 2.5%;
    }

    /* Style an entry of the constant field */
    .constantField {
        width: 100%;
        height: 30px;
        text-align: center;
    }

    /* Style the return home link container */
    .navbar {
        height: 30px;
        text-align: center;
        vertical-align: center;
        padding-top: 20px;
    }

    /* Style the link itself */
    a {
        text-decoration: none;
        color: #FFF;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        background: #007feb;
        padding: 8px 12px;
    }
</style>