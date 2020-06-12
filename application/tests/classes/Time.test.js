import {createLocalVue, mount} from "@vue/test-utils";
import {describe} from "@jest/globals";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

describe("Pause button", () => {
    it("pauses the time.", () => {
        expect
    });
});