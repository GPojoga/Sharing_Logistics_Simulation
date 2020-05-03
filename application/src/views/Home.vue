<template>
    <div>
        <Map/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "@/components/ControlPanel";
    import Map from "@/components/Map";

    export default {
        name: 'Home',
        components: {
            ControlPanel,
            Map,
        }
    }
</script>
