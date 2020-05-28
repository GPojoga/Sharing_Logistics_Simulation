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
        }
    }
</script>
