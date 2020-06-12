import {Observable} from "@/classes/util/Observable";

test('addListener',()=>{
    let observable = new Observable();
    expect(observable._listeners.length).toEqual(0);
    let observer1 = {
        update: function () {}
    };
    let observer2 = {
        update: function () {}
    };
    let observer3 = {
        update: function () {}
    };
    observable.addListener(observer1);
    observable.addListener(observer2);
    observable.addListener(observer3);
    expect(observable._listeners.length).toEqual(3);
});

test('notify',()=>{
    let observable = new Observable();
    let message = 'some message';
    let counter = 0;
    let observer1 = {
        update: function (source,ms) {
            expect(source).toBe(observable);
            expect(ms).toBe(message);
            counter++;
        }
    };
    let observer2 = {
        update: function (source,ms) {
            expect(source).toBe(observable);
            expect(ms).toBe(message);
            counter++;
        }
    };
    let observer3 = {
        update: function (source,ms) {
            expect(source).toBe(observable);
            expect(ms).toBe(message);
            counter++;
        }
    };
    observable.addListener(observer1);
    observable.addListener(observer2);
    observable.addListener(observer3);
    observable.notify(message);
    expect(counter).toEqual(3)
});