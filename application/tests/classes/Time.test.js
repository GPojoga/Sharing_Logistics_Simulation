import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import {beforeEach, expect} from "@jest/globals";
import Time from "../../src/classes/Time";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let time;
beforeEach(() => {
    time = new Time();
});

test('Toggle and pause time', () => {
    // After initialization
    expect(time.isPaused).toEqual(false);

    // Simulation starts running
    store.state.isRunning = true;
    time.togglePause();
    expect(time.isPaused).toEqual(true);
    time.togglePause();
    expect(time.isPaused).toEqual(false);

    // Simulation stopped running
    store.state.isRunning = false;
    expect(time.isPaused).toEqual(false);
    time.togglePause();
    expect(time.isPaused).toEqual(false);
});

test('Accelerate time', () => {
    // Simulation is not yet running
    let playSpeed = time.playSpeed;
    time.speedUp();
    expect(time.playSpeed).toEqual(playSpeed);

    // Simulation is now running
    store.state.isRunning = true;
    time.run();
    playSpeed = time.playSpeed;
    time.speedUp();
    expect(time.playSpeed).toEqual(2*playSpeed);
    store.state.isRunning = false;
});

test('Decelerate time', () => {
    // Simulation is not yet running
    let playSpeed = time.playSpeed;
    time.slowDown();
    expect(time.playSpeed).toEqual(playSpeed);

    // Simulation is now running
    store.state.isRunning = true;
    time.run();
    playSpeed = time.playSpeed;
    time.slowDown();
    expect(2*time.playSpeed).toEqual(playSpeed);
    store.state.isRunning = false;
});