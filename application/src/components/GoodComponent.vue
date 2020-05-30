<template>
    <div>
        <p>Good quantity : {{good.quantity}}</p>
        <p>Good weight : {{good.weight}}</p>
        <p>Good volume : {{good.volume}}</p>
    </div>
</template>

<script>
    import Good from "@/classes/goods/Good.js"

    export default {
        name: "GoodComponent",
        props:{
            good : Good,
        }
    }
</script>

<style scoped>

</style>