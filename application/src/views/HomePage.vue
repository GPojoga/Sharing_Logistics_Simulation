<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
        <TimeControl/>
        <SimulationData/>
    </div>
</template>

<script>
    import ControlPanel from "../components/ControlPanel";
    import SimplifiedMap from "../components/SimplifiedMap";
    import TimeControl from "../components/TimeControl";
    import SimulationData from "@/components/SimulationData/SimulationData";

    export default {
        name: 'HomePage',
        components: {
            SimulationData,
            ControlPanel,
            SimplifiedMap,
            TimeControl
        }
    }
</script>
