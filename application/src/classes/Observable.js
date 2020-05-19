
export class Observable{
    _listeners = [];
    _listenersHasFinished = [];

    addListener(obj){
        if(typeof(obj.update) == "function"){
            this._listeners.push(obj);
        }else{
            console.error("Listener does not implement update function");
        }
    }

    addListenerHasFinished(obj){
        if(typeof(obj.updateHasFinished) == "function"){
            this._listenersHasFinished.push(obj);
        }else{
            console.error("Listener does not implement updateHasFinished function");
        }
    }

    getListeners(){
        return this._listeners;
    }

    notify(){
        this._listeners.map(x => x.update(this));
    }

    notifyHasFinishedListeners() {
        this._listenersHasFinished.map(x => x.updateHasFinished());
    }
}