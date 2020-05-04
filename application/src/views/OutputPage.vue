<template>
  <div>
    <div class="navbar">
      <router-link to="/">Home</router-link>
    </div>

    <div id="main">
      <div id="newWay" class="header">
        <h2>Sharing Logistics</h2>
      </div>
      <div id="newWayPanel" class="panel">
        <div class="outputElement">
          <h3>Transportation time</h3>
          <p class="output">{{Math.round(sharing.time)}} h</p>
        </div>
        <div class="outputElement">
          <h3>Number of vehicles used</h3>
          <p class="output">{{sharing.count}}</p>
        </div>
        <div class="outputElement">
          <h3>CO2 emissions</h3>
          <p class="output">{{Math.round(sharing.emission)}} kg</p>
        </div>
      </div>

      <div id="oldWay" class="header">
        <h2>Traditional Method</h2>
      </div>
      <div id="oldWayPanel" class="panel">
        <div class="outputElement">
          <h3>Transportation time</h3>
          <p class="output">{{Math.round(traditional.time)}} h</p>
        </div>
        <div class="outputElement">
          <h3>Number of vehicles used</h3>
          <p class="output">{{traditional.count}}</p>
        </div>
        <div class="outputElement">
          <h3>CO2 emissions</h3>
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
        let dis = this.$store.state.route.distance;
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
        let dis = this.$store.state.route.distance;
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
  .navbar {
    height: 30px;
    text-align: center;
    vertical-align: center;
    padding-top: 20px;
  }

  a {
    text-decoration: none;
    color: #FFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #007feb;
    padding: 8px 12px;
  }

  .panel {
    height: 70vh;
    width: 30vw;
    background-color: #f1f9ff;
    position: absolute;
    top: 20vh;
    border-radius: 10px;
    padding: 10px 50px;
    display: inline-block;
    overflow: auto;
  }

  .header {
    width: 40vw;
    display: inline-block;
    text-align: center;
  }

  #newWayPanel{
    left: 10vw;
  }

  .outputElement {
    margin: 40px 0;
  }

  #oldWayPanel{
    right: 10vw;
  }

  .output{
    text-align: center;
    font-family: "Arial", Arial, sans-serif;
    margin: 20px;
    color: #007FEB;
    font-weight: bold;
    font-size: 130%;
  }
  
</style>