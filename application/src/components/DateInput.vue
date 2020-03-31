<template>
    <div class="date">
        <label>
            {{ dateInputLabel }}
            <input type="date" :id="dateInputLabel" :value="value" v-on:input="sendInput($event.target.value)">
        </label>
    </div>
</template>

<script>
    export default {
        name: "DateInput",
        props: {
            dateInputLabel: String,
            value: {
                type: String,
                required: true
            },
            minimumDate: {
                type: String,
                required: true
            }
        },
        methods: {
            sendInput(date) {
                this.$emit('input', date);
            }
        }
    }
</script>

<style scoped>
    .date {
        width: 45%;
        float: left;
        position: relative;
    }

    input{
        margin-top: 5px;
        padding-left: 10px;
        height: 30px;
        width: 95%;
        background-color: #f1f9ff;
        border: solid #007FEB;
        color: #007FEB;
        font-weight: bold;
        font-size: medium;
        border-radius: 5px;
    }

    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    label {
        font-weight: bold;
        height: 20px;
    }
</style>