<template>
  <div>
    <div class="navbar">
      <router-link to="/">Home</router-link>
    </div>

    <div id="main">
      <div class="header">
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

      <div class="header">
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
    name: 'OutputPage',
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
       * This function simulates the traditional method of sending packages.
       */
      findTraditional() {
        // TODO implement this function
        alert("Traditional simulation is not implemented yet!");
      },

      /**
       * This function simulates the sharing method of sending packages.
       */
      findSharing() {
        // TODO implement this function
        alert("Sharing simulation is not implemented yet!");
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

  /* Stylize the panel of both results */
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
    font-family: "Arial", Arial, sans-serif;
    margin: 20px;
    color: #007FEB;
    font-weight: bold;
    font-size: 130%;
  }
  
</style>