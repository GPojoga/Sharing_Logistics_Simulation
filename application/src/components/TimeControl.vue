<template>
    <div id="footer">
        <div v-if="isRunning" id="timeBackground">
            <div id="infoContainer">
                <p id="timeText">
                    {{time}}
                </p>
            </div>
            <div id="buttonContainer">
                <div class="buttonBox">
                    <basic-round-button content="minus" :is-disable="!isRunning || !canDecrease" @click="decrease"/>
                </div>
                <div class="buttonBox">
                    <basic-round-button :content="isPaused ? 'play' : 'pause'" :is-disable="!isRunning" @click="playPause"/>
                </div>
                <div class="buttonBox">
                    <basic-round-button content="plus" :is-disable="!isRunning || !canIncrease" @click="increase"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BasicRoundButton from "./BasicRoundButton";
    export default {
        name: "TimeControl",
        components: {BasicRoundButton},
        computed: {
            canIncrease: function () {
                return !this.$store.getters.time.isFastest();
            },
            canDecrease: function () {
                return !this.$store.getters.time.isSlowest();
            },
            isRunning : function () {
                return this.$store.getters.isRunning;
            },
            isPaused : function () {
                return this.$store.getters.time.getIsPaused();
            },
            time : function () {
                return this.convertTime(this.$store.getters.time.getTimePassed());
            }
        },
        methods: {
            /**
             * This function increases the rate at which the simulation is run.
             */
            increase : function() {
                this.$store.getters.time.speedUp();
            },
            /**
             * This function decreases the rate at which the simulation is run.
             */
            decrease : function () {
                this.$store.getters.time.slowDown();
            },
            /**
             * This function pauses and plays the simulation.
             */
            playPause : function () {
                this.$store.getters.time.togglePause();
            },
            /**
             * This function converts time into a string format HHH:MM:SS
             * @param time The time in seconds.
             * @returns {string} The time is the string format HHH:MM:SS
             */
            convertTime : function (time) {
                let seconds = this.convertTwoDigits(Math.floor(time%60));
                time = time/60;
                let minutes = this.convertTwoDigits(Math.floor(time%60));
                time = time/60;
                let hours = Math.floor(time);
                return hours + ":" + minutes + ":" + seconds;
            },
            /**
             * This is a helper function to the convert time function it
             * @param num A number between 0 and 99.
             * @returns {string} The number in a string of two digits.
             */
            convertTwoDigits : function (num) {
                if (num < 10) return "0" + String(num);
                return String(num);
            },
        }
    }
</script>

<style scoped>
    /* Style the footer of the webapp. */
    #footer {
        position : fixed;
        bottom: 0;
        right: 40%;
        left: 40%;
        width: 20%;
    }

    /* Style the background of the time settings. */
    #timeBackground {
        width: 200px;
        height: 75px;
        margin: auto;
        padding: 10px;

        background: white;
        box-shadow: 2px 10px 10px 4px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
    }

    #infoContainer {
        height: 25px;
    }

    #timeText {
        margin: 0;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }

    #buttonContainer {
        height: 50px;
        column-count: 3;
    }

    /* Style the div box containing the button. */
    .buttonBox {
        height: 44px;
        width: 44px;
        margin-left: auto;
        margin-right: auto;
    }
</style>