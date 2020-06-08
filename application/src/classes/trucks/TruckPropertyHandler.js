export default {

    /**
     * This method retrieves the description of the truck from storage
     * and sets the properties of the truck according to its type
     * @param store
     * @param type truck type
     * @private
     */
    getProperties(store,type){
        let props = this._getPropertiesFromStorage(store,type);
        return {
            type : type,
            volume : parseFloat(props.volume.value),
            maxPayload : parseFloat(props.maxPayload.value),
            consumptionEmpty : parseFloat(props.consumptionEmpty.value),
            consumptionPerKg :
                (props.consumptionFull.value - props.consumptionEmpty.value) / props.maxPayload.value,
        }
    },

    /**
     * This function retrieves the properties of the given truck type
     * from the store. If the type does not exist in the store, the
     * Train type is set by default
     * @param store
     * @param type truck type
     * @private
     * @return Object
     */
    _getPropertiesFromStorage(store,type){
        let tType = store.state.truckTypes.find(x => x.key === type);
        let props;
        if(tType !== undefined){
            props = tType;
        }else{
            console.error("Truck : Undefined truck type (default : Train)");
            props = store.state.truckTypes.find(x => x.key === "Train");
        }
        return props;
    }
}