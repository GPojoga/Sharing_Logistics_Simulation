<template>
  <div>
    <div class="navbar">
      <basic-button layout="solid">
        <router-link to="/">Home</router-link>
      </basic-button>
    </div>

    <div id="main">
      <div v-for="(sim, index) in [sharing, traditional]"
           v-bind:key="index"
           class="simulationResultsField">
        <div class="header">
          <h1 v-if="index === 0">Sharing Logistics</h1>
          <h1 v-if="index === 1">Traditional Method</h1>
        </div>
        <div class="panel" :class="{ newWayPanel : index === 0, oldWayPanel : index === 1 }">
          <div class="innerPanel">
            <div class="outputElement">
              <h2>Trucks finished after</h2>
              <p class="output">{{sim.time === 0? "Simulation hasn't run yet!" : printTime(sim.time)}}</p>
            </div>
            <div class="outputElement">
              <h2>Total distance</h2>
              <p class="output">{{Math.round(sim.distance)}} m</p>
            </div>
            <div class="outputElement">
              <h2>Number of vehicles used</h2>
              <p class="output">{{sim.numberOfTrucks}}</p>
            </div>
            <div class="outputElement">
              <h2>CO<sub>2</sub> emissions</h2>
              <p class="output">{{sim.co2emissions.toFixed(1)}} kg</p>
            </div>
            <div class="outputElement">
              <h2>Fuel consumed</h2>
              <p class="output">{{sim.fuelConsumed.toFixed(2)}} L</p>
            </div>
            <div class="outputElement">
              <h2>Average delivery time</h2>
              <p class="output">{{printTime(sim.averageDeliveryTime)}}</p>
            </div>
            <div class="outputElement">
              <h2>Average transit time</h2>
              <p class="output">{{printTime(sim.averageTransitTime)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BasicButton from "../components/BasicButton";
  export default {
    name: 'OutputPage',
    components: {BasicButton},
    methods: {
      printTime(seconds) {
        seconds = Math.round(seconds);

        const hours = Math.floor(seconds / 3600);
        seconds = seconds - hours*3600;

        const minutes = Math.floor(seconds / 60);
        seconds = seconds - minutes*60;

        return hours + ' h ' + minutes + ' m ' + seconds + ' s';
      }
    },
    computed: {
      sharing() {
        return this.$store.state.simulationResults.shared;
      },
      traditional() {
        return this.$store.state.simulationResults.traditional;
      }
    }
  }
</script>

<style>
  /* Stylize the container of the header and panel */
  .simulationResultsField {
    width: 50vw;
    display: inline-block;
  }

  /* Stylize the navigation button */
  .navbar {
    height: 30px;
    text-align: center;
    vertical-align: center;
    padding-top: 20px;
  }

  /* Style of the link aka the navigation button */
  a {
    text-decoration: none;
    color: #FFF;
    padding: 8px 12px;
  }

  /* Style the headers of the results */
  h2 {
    font-size: 1.3em;
  }

  /* Stylize the panel of both results */
  .panel {
    height: 70vh;
    width: 38vw;
    background-color: #f1f9ff;
    position: absolute;
    top: 20vh;
    border-radius: 10px;
    display: inline-block;
    overflow: hidden;
  }

  /* Stylize the part inside the panel separately, such that the scrollbar doesn't create square corners on the right. */
  .innerPanel {
    overflow-y: auto;
    height: 100%;
    padding: 10px 50px;
  }

  /* Stylize the titles of both results */
  .header {
    width: 30vw;
    display: inline-block;
    text-align: center;
  }

  /* Set the new way to the left */
  .newWayPanel{
    left: 10vw;
  }

  /* Style the output div */
  .outputElement {
    margin: 40px 0;
  }

  /* Set the old way to the right */
  .oldWayPanel{
    right: 10vw;
  }

  /* Stylize the output text */
  .output{
    text-align: center;
    margin: 0;
    color: #007FEB;
    font-weight: bold;
    font-size: 1em;
  }

  /* Scrollbar layout */
  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f9ff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2284ff;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #197cd8;
  }
</style>