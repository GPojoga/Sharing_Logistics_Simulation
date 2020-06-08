
export class Observable{
    _listeners = [];

    addListener(obj){
        if(typeof(obj.update) == "function"){
            this._listeners.push(obj);
        }else{
            console.error("Listener does not implement update function");
        }
    }

    notify(message){
        this._listeners.map(x => x.update(this,message));
    }
}