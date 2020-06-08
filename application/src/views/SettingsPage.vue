<template>
    <div id="background">
        <p id="title">
            Constants
        </p>

        <div id="box">
            <div id="innerBox">
                <SettingsGlobalVariables />

                <div v-for="type in truckTypes" :key="type.name">
                    <div class="truckName">
                        <p class="truckText">
                            {{type.name}}
                        </p>
                    </div>
                    <SettingsTruckVariables :index="truckTypes.indexOf(type)" />
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
    import SettingsGlobalVariables from "@/components/SettingsGlobalVariables";
    import SettingsTruckVariables from "@/components/SettingsTruckVariables";
    export default {
        name: "SettingsPage",
        components: {
            SettingsGlobalVariables,
            SettingsTruckVariables
        },
        computed: {
            truckTypes : function() {
                return this.$store.getters.truckTypes;
            },
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
        padding: 10px;
    }

    /* Style the container containing the constants */
    #box {
        border-radius: 10px;
        border: 2px solid #007feb;
        background-color: white;
        width: 600px;
        height: 550px;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }

    /* Stylize the part inside the box, such that the scrollbar doesn't create square corners on the right. */
    #innerBox {
        overflow-y: auto;
        height: 100%;
        padding: 20px 0;
    }

    /* Style an entry of the name column */
    .truckName {
        height: 30px;

        text-align: left;
        font-weight: bold;
        padding-left: 5%;
        display: block;
    }

    /* Stylize the entry text so that there is no padding. */
    .truckText {
        margin : 0;
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

    /* Scrollbar layout */
    /* width */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f9ff;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #2284ff;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #197cd8;
    }
</style>