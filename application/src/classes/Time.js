import store from "../store/index.js";

export class Time {
    // Constants representing the min and max speed the simulation can run.
    MIN_SPEED = 1/64;
    MAX_SPEED = 64;

    // Constant representing the default speed of the simulation.
    DEFAULT_SPEED = 1;
    
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
                if (store.state.getters.isRunning) {
                    if (this.isPaused) this.elapsedTime += this.playSpeed / this.UPDATE_RATE;
                    this.run();
                }
            },
            1000/this.UPDATE_RATE
        );
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
        if (!this.isSlowest()){
            this.playSpeed /= 2;
        }
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
        if (!this.isFastest()){
            this.playSpeed *= 2;
        }
    }

    /**
     * This method pauses/plays the simulation.
     */
    togglePause() {
        this.isPaused = !this.isPaused;
    }
}