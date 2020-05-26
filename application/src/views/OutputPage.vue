<template>
  <div>
    <div class="navbar">
      <router-link to="/">Home</router-link>
    </div>

    <div id="main">
      <div class="header">
        <h1>Sharing Logistics</h1>
      </div>
      <div id="newWayPanel" class="panel">
        <div class="innerPanel">
          <div class="outputElement">
            <h2>Transportation time</h2>
            <p class="output">{{Math.round(sharing.distance)}} h</p>
          </div>
          <div class="outputElement">
            <h2>Number of vehicles used</h2>
            <p class="output">{{sharing.numberOfTrucks}}</p>
          </div>
          <div class="outputElement">
            <h2>CO<sup>2</sup> emissions</h2>
            <p class="output">{{Math.round(sharing.co2emissions)}} kg</p>
          </div>
          <div class="outputElement">
            <h2>Fuel consumed</h2>
            <p class="output">{{sharing.fuelConsumed.toFixed(4)}} L??????????????????</p>
          </div>
        </div>
      </div>

      <div class="header">
        <h1>Traditional Method</h1>
      </div>
      <div id="oldWayPanel" class="panel">
        <div class="innerPanel">
          <div class="outputElement">
            <h2>Transportation time</h2>
            <p class="output">{{Math.round(traditional.distance)}} h</p>
          </div>
          <div class="outputElement">
            <h2>Number of vehicles used</h2>
            <p class="output">{{traditional.numberOfTrucks}}</p>
          </div>
          <div class="outputElement">
            <h2>CO<sup>2</sup>  emissions</h2>
            <p class="output">{{Math.round(traditional.co2emissions)}} kg</p>
          </div>
          <div class="outputElement">
            <h2>Fuel consumed</h2>
            <p class="output">{{traditional.fuelConsumed.toFixed(4)}} L??????????????????</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OutputPage',
    components: {},
    computed: {
      sharing() {
        console.log(this.$store.state.simulationResults);
        return this.$store.state.simulationResults.shared;
      },
      traditional() {
        return this.$store.state.simulationResults.traditional;
      }
    }
  }
</script>

<style>
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
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #007feb;
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
    width: 40vw;
    display: inline-block;
    text-align: center;
  }

  /* Set the new way to the left */
  #newWayPanel{
    left: 10vw;
  }

  /* Style the output div */
  .outputElement {
    margin: 40px 0;
  }

  /* Set the old way to the right */
  #oldWayPanel{
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