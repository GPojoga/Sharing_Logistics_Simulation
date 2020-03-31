<template>
  <div>
    <router-link to="/">Home</router-link>
    <div class="new">
      <div id="newWay">
        <h2>Sharing Logistics</h2>
      </div>
      <div id="newWayPanel" class="panel">
        <div id="deliveryTime1" class="deliveryTime1">
          <h3>Expected delivery time: </h3>
          <p class="output">{{Math.round(sharing.time)}} h</p>
        </div>
        <div id="vehicleUsed1" class="vehicleUsed">
          <h3>Total numbers of vehicles used:</h3>
          <p class="output">{{sharing.count}}</p>
        </div>
        <div id="co2E1" class="co2E">
          <h3>CO2 Emissions:</h3>
          <p class="output">{{Math.round(sharing.emission)}} kg</p>
        </div>
      </div>
      <div id="oldWay">
        <h2>Traditional Method</h2>
      </div>
      <div id="oldWayPanel" class="panel">
        <div id="deliveryTime2" class="deliveryTime2">
          <h3>Expected delivery time:</h3>
          <p class="output">{{Math.round(traditional.time)}} h</p>
        </div>
        <div id="vehicleUsed2" class="vehicleUsed">
          <h3>Total numbers of vehicles used:</h3>
          <p class="output">{{traditional.count}}</p>
        </div>
        <div id="co2E2" class="co2E">
          <h3>CO2 Emissions:</h3>
          <p class="output">{{Math.round(traditional.emission)}} kg</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        traditional : {
          time : 0,
          count : 0,
          emission : 0
        },
        sharing : {
          time : 0,
          count : 0,
          emission : 0
        }
      }
    },
    mounted() {
      this.findTraditional();
      this.findSharing();
    },
    methods : {
      /**
       * This function finds the total number of trucks.
       * @param trucks array with the counts of all trucks.
       * @returns {*} The total number of trucks.
       */
      sumTrucks(trucks) {
        return trucks[0] + trucks[1] + trucks[2];
      },
      /**
       * This function sends trucks loaded with the goods, in an array.
       * @param good The good that needs to be transported.
       * @param trucks The list of trucks available.
       * @returns {[]} A list of trucks, where each truck has a certain type and payload.
       */
      sendTrucks(good, trucks) {
        let sentTrucks = [];

        // Base case no trucks left
        if (Number(good.quantity) === 0 || this.sumTrucks(trucks) === 0){
          return sentTrucks;
        }

        let totalWeight = Number(good.quantity) * Number(good.weight);
        let totalVolume = Number(good.quantity) * Number(good.volume);

        //Case in which all goods fit in a single truck
        for (let i = 0; i < this.$store.state.numberTrucks; i++){
          let truck = this.$store.state.truckTypes[i];
          if (trucks[i] > 0 && truck.volume > totalVolume && truck.maxPayload > totalWeight) {
            trucks[i]--;
            good.quantity = "0";
            sentTrucks.push([truck, totalWeight]);
            return sentTrucks;
          }
        }

        // Case more than one truck needed
        for (let i = this.$store.state.numberTrucks - 1; i >= 0; i--){
          if (Number(good.quantity) > 0 && trucks[i] > 0){
            let truck = this.$store.state.truckTypes[i];
            let qFit = Math.min(Math.floor(truck.volume / Number(good.volume)), Math.floor(truck.maxPayload / Number(good.weight)));
            good.quantity = String(Number(good.quantity) - qFit);
            trucks[i]--;
            sentTrucks = this.sendTrucks(good, trucks);
            sentTrucks.push([truck, qFit * Number(good.weight)]);
          }
        }

        return sentTrucks;
      },
      /**
       * This function simulates the traditional method of sending packages between two points A & B.
       */
      findTraditional() {
        let dis = this.$store.state.locations.distance;
        let goods = this.$store.state.A.cargo.map(a => Object.assign({}, a));
        let trucks = this.$store.state.A.vehicles.slice();

        //TODO: change this so it supports goods being sent from both locations
        for (let i = 0; i < goods.length; i++){
          let good = goods[i];
          while (Number(good.quantity > 0)) {
            let trucksSent = this.sendTrucks(good, trucks);
            this.traditional.count += trucksSent.length;

            for (let j = 0; j < trucksSent.length; j++){
              let truck = trucksSent[j][0];
              let payload = trucksSent[j][1];
              let fuel_rate = truck.consumption0 + payload/truck.maxPayload * (truck.consumption1 - truck.consumption0);
              this.traditional.emission += this.$store.state.emissionBurnt * dis * fuel_rate;
            }

            if (trucks[0] === 0 && trucks[1] === 0 && trucks[2] === 0){
              trucks = this.$store.state.A.vehicles.slice();
              this.traditional.time += 2 * dis / this.$store.state.averageSpeed;
            } else if (i + 1 === goods.length) {
              //Added this is case it is last goods that needs to be transported.
              this.traditional.time += 2 * dis / this.$store.state.averageSpeed;
            }
          }
        }
      },
      /**
       * This function finds the average good given a array of goods.
       * @param goods The array of goods to find the average from.
       * @returns {{volume: string, quantity: string, weight: string}} A good representing the average of a list.
       */
      getAverageGood(goods) {
        let quantity = 0;
        let totalWeight = 0;
        let totalVolume = 0;
        for (let i = 0; i < goods.length; i++){
          quantity += Number(goods[i].quantity);
          totalWeight += Number(goods[i].weight) * Number(goods[i].quantity);
          totalVolume += Number(goods[i].volume) * Number(goods[i].quantity);
        }

        return {
          quantity: String(quantity),
          weight: String(totalWeight/quantity),
          volume: String(totalVolume/quantity)
        };
      },
      /**
       * This function finds the reusable trucks, making a journey back.
       * @param sentTrucks The array of sent trucks
       * @returns {number[]} The count of each type of truck sent.
       */
      getReusableTrucks(sentTrucks) {
        let reusable = [0, 0, 0];

        for (let i = 0; i < sentTrucks.length; i++){
          if (sentTrucks[i][0].key === "Light"){
            reusable[0]++;
          } else if (sentTrucks[i][0].key === "Heavy"){
            reusable[1]++;
          } else { // key === "Train"
            reusable[2]++;
          }
        }

        return reusable;
      },
      /**
       * This function simulates the sharing method of sending packages between two points A & B.
       */
      findSharing() {
        let dis = this.$store.state.locations.distance;
        let goods = this.$store.state.A.cargo.map(a => Object.assign({}, a));
        let trucks = this.$store.state.A.vehicles.slice();

        // TODO: change this so it supports goods being sent from both locations
        let good = this.getAverageGood(goods);
        while (Number(good.quantity) > 0){

          let trucksSent = this.sendTrucks(good, trucks);
          this.sharing.count += trucksSent.length;

          for (let j = 0; j < trucksSent.length; j++){
            let truck = trucksSent[j][0];
            let payload = trucksSent[j][1];
            let fuel_rate = truck.consumption0 + payload/truck.maxPayload * (truck.consumption1 - truck.consumption0);
            this.sharing.emission += this.$store.state.emissionBurnt * dis * fuel_rate;
          }

          trucks = this.$store.state.A.vehicles.slice();
          this.sharing.time += 2 * dis / this.$store.state.averageSpeed;
        }

      }
    }
  }
</script>

<style>
  #newWayPanel{
    height: 70%;
    width: 30%;
    background-color: #f1f9ff;
    position: absolute;
    left: 10%;
    top: 15%
  }

  #deliveryTime1{
    left: 2%;
    position: absolute;
  }

  #vehicleUsed1{
    left: 2%;
    position: absolute;
    top: 25%;
  }

  #co2E1{
    left: 2%;
    position: absolute;
    top: 50%;
  }

  #oldWayPanel{
    height: 70%;
    width: 30%;
    background-color: #f1f9ff;
    position: absolute;
    right: 10%;
    top: 15%
  }

  #deliveryTime2{
    left: 2%;
    position: absolute;
  }

  #vehicleUsed2{
    left: 2%;
    position: absolute;
    top: 25%;
  }

  #co2E2{
    left: 2%;
    position: absolute;
    top: 50%;
  }

  #newWay{
    left: 10%;
    position: absolute;
  }

  #oldWay{
    right: 23.5%;
    position: absolute;
  }

  .output{
    text-align: left;
    font-family: "Arial", Arial, sans-serif;
    margin: 20px;
    color: #007FEB;
    font-weight: bold;
    font-size: 130%;
  }
  
</style>