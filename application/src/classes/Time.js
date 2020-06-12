import store from "../store/index.js";

export default class Time {
    // Constants representing the min and max speed the simulation can run.
    MIN_SPEED = 1/4;
    MAX_SPEED = 1024;

    // Constant representing the default speed of the simulation.
    DEFAULT_SPEED = 16;

    // Constant representing the number of frequency of time updates.
    UPDATE_RATE = 100;

    // The total time that has passed since the start of the simulation
    elapsedTime;

    // A value indicating whether the simulation is paused or not.
    isPaused;

    // The speed the simulation is running at.
    playSpeed;

    /**
     * This is the constructor of the Time object.
     */
    constructor() {
        this.elapsedTime = 0;
        this.playSpeed = this.DEFAULT_SPEED;
        this.isPaused = false;
    }

    /**
     * This method runs the time of the simulation.
     */
    run() {
        setTimeout( () => {
                if (store.getters.isRunning) {
                    if (!this.isPaused) this.elapsedTime += this.playSpeed / this.UPDATE_RATE;
                    // recursion so that run is constantly being called.
                    this.run();
                }
            },
            1000/this.UPDATE_RATE
        );
    }

    reset(){
        this.elapsedTime = 0;
    }

    /**
     * This method gets the time passed since a certain moment in the simulation.
     * @param time The point in time which should be compared to the new time.
     * @returns {number} The time that has passed since the inputted time.
     */
    getTimePassed(time = 0){
        return this.elapsedTime - time;
    }

    /**
     * This method is a getter of the the play speed of the simulation.
     * @returns {number} The play-speed as a percentage of the default speed of the simulation.
     */
    getPlaySpeed(){
        return this.playSpeed/this.DEFAULT_SPEED;
    }

    /**
     * This method checks if the simulation is currently running at the slowest possible setting.
     * @returns {boolean} True if the simulation is running at the slowest speed False otherwise.
     */
    isSlowest() {
        return this.playSpeed <= this.MIN_SPEED;
    }

    /**
     * This method slows down the speed at which the simulation is run.
     */
    slowDown() {
        if (!store.getters.isRunning) return;
        if (!this.isSlowest()) this.playSpeed /= 2;
    }


    /**
     * This method checks if the simulation is currently running at the fastest possible setting.
     * @returns {boolean} True if the simulation is running at the fastest speed False otherwise.
     */
    isFastest() {
        return this.playSpeed >= this.MAX_SPEED;
    }

    /**
     * This method speeds up the speed at which the simulation is run.
     */
    speedUp() {
        if (!store.getters.isRunning) return;
        if (!this.isFastest()) this.playSpeed *= 2;
    }

    /**
     * This method is the getter for the variable isPaused.
     * @returns {*} A boolean determining whether the simulation is paused or not.
     */
    getIsPaused() {
        return this.isPaused;
    }

    /**
     * When the simulation is running, this method pauses the time if it was not paused
     * and starts the time if it was.
     */
    togglePause() {
        if (store.getters.isRunning) this.isPaused = !this.isPaused;
    }
}