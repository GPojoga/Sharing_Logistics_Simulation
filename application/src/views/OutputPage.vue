<template>
  <div class="output">
    <router-link to="/">Home</router-link>
    <div class="new">
      <div id="newWay"><h2>Sharing Logistics</h2></div>
      <div id="newWayPanel" class="panel">
        <div id="deliveryTime1" class="deliveryTime1"><h3>Expected delivery time:</h3></div>
        <div id="vehicleUsed1" class="vehicleUsed"><h3>Total numbers of vehicles used:</h3></div>
        <div id="co2E1" class="co2E"><h3>Co2 Emissions:</h3></div>
      </div>
      <div id="oldWay"><h2>Traditional Method</h2></div>
      <div id="oldWayPanel" class="panel">
        <div id="deliveryTime2" class="deliveryTime2"><h3>Expected delivery time:</h3></div>
        <div id="vehicleUsed2" class="vehicleUsed"><h3>Total numbers of vehicles used:</h3></div>
        <div id="co2E2" class="co2E"><h3>Co2 Emissions:</h3></div>
      </div>
    </div>
  </div>
</template>


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
  
</style>