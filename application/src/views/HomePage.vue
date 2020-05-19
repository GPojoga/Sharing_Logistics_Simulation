<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
        <TimeControl/>
    </div>
</template>

<script>
    import ControlPanel from "../components/ControlPanel";
    import SimplifiedMap from "../components/SimplifiedMap";
    import TimeControl from "../components/TimeControl";

    export default {
        name: 'HomePage',
        components: {
            ControlPanel,
            SimplifiedMap,
            TimeControl
        },
        mounted() {
            let locationA = {
                lng : 6.5619295,
                lat : 53.2153888
            };
            let locationB = {
                lat : 53.212664,
                lng : 6.565231
            };

            // this.$store.commit('addNewTruck');
            this.$store.commit('setTruckStartingLocation', {value: locationB, index: 0});

            // this.$store.commit('addNewGood');
            this.$store.commit('setGoodPickupLocation', {value: locationA, index: 0});
            this.$store.commit('setGoodDeliveryLocation', {value: locationB, index: 0});
            this.$store.commit('setGoodQuantity', {value: 4, index: 0});
            this.$store.commit('setGoodWeight', {value: 1, index: 0});
            this.$store.commit('setGoodVolume', {value: 1, index: 0});
        }
    }
</script>
