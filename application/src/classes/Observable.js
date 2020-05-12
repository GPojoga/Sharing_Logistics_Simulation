
export class Observable{
    __listeners = [];

    addListener(obj){
        if(typeof(obj.update) == "function"){
            this.__listeners.push(obj);
        }else{
            console.error("Listener does not implement update function");
        }
    }

    getListeners(){
        return this.__listeners;
    }

    notify(){
        this.__listeners.map(x => x.update(this));
    }
}