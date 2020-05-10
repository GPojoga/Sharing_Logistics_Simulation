<template>
    <div id="background">
        <p id="title">
            Constants
        </p>
        <br>

        <div id="box">
            <br>
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

    /* Style an entry of the name column */
    .truckName {
        width: 80%;
        height: 30px;

        float: left;
        text-align: left;
        padding-left: 5%;
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
</style>