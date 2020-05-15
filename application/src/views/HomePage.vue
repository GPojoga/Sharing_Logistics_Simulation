<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "../components/ControlPanel";
    import SimplifiedMap from "../components/SimplifiedMap";

    export default {
        name: 'HomePage',
        components: {
            ControlPanel,
            SimplifiedMap,
        }
    }
</script>
