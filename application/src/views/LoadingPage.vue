<template>
    <div class="loadingPage">
        <div class="loadingMessage">LOADING...</div>
    </div>
</template>

<script>
    export default {
        name: "LoadingPage"
    }
</script>

<style scoped>
    .loadingPage {
        width: 100%;
        height: auto;
        bottom: 0;
        top: 0;
        left: 0;
        position: absolute;
    }

    .loadingMessage {
        position: absolute;
        width: 100px;
        height: 50px;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -50px;
    }
</style>