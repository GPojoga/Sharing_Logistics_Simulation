<template>
    <div class="date">
        <label>
            {{ dateInputLabel }}
            <input required type="date" :id="dateInputLabel" :value="value" v-on:input="this.$emit('input', $event.target.value)">
        </label>
        <p v-if="error">
            Please enter a valid date.
        </p>
    </div>
</template>

<script>
    export default {
        name: "DateInput",
        props: {
            dateInputLabel: String,
            value: Date,
            minimumDate: {
                type: Date,
                required: true
            }
        },
        data() {
            return {
                error: false
            }
        },
        methods: {
            sendInput($event) {
                const date = $event.target.value;
                this.error = (date < this.minimumDate);
                this.$emit('input', date);
            }
        },
        computed: {
            today: function() {
                return new Date();
            }
        }
    }
</script>

<style scoped>
    .date {
        height: 60px;
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

    label {
        font-weight: bold;
        height: 20px;
    }
</style>