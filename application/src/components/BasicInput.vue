<template>
    <input :type="type"
           :value="value"
           @input="$emit('input', $event.target.value)"
           @focus="$emit('focus')"
           @blur="$emit('blur')"
           autocomplete="off"
    />
</template>

<script>
    export default {
        name: "BasicInput",
        props: [
            'type',
            'value'
        ]
    }
</script>

<style scoped>
    input{
        margin-top: 5px;
        margin-right: 1%;
        height: 31px;
        background-color: #f1f9ff;
        border: 0px solid #2284ff;
        color: #007feb;
        font-size: medium;
        border-radius: 5px;
    }

    input:focus {
        border-color: orange;
        background-color: #fff7c9;
        outline: 0;
    }
</style>