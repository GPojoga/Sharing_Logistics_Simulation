<template>
  <div id="controlPanel" class="collapsible">
    <div id="collapseController">
      <button id="collapseButton" v-on:click="collapseCP()"></button>
    </div>
    <div class="locations">
      <div class="location">
        <input type="text" id="location1" placeholder="Location">
      </div>
      <div class="location">
        <input type="text" id="location2" placeholder="Location">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlPanel',
  data() {
    return{
      controlPanelLeftPos: 0,
    }
  },
  methods:{
    collapseCP(){

      let controlPanel = document.getElementById('controlPanel');

      this.controlPanelLeftPos = this.controlPanelLeftPos === 0 ? -400 : 0;
      controlPanel.style.left = this.controlPanelLeftPos.toString(10)+"px";
    }
  }
}
</script>

<style scoped>
  #controlPanel{
    background: #244e40;
    height: 100%;
    width: 400px;
    overflow: visible;
    position: absolute;
    left:0;
    color: #fffece;
    transition: left 0.5s;
  }

  #collapseController{
    width: 20px;
    height: 40px;
    position: absolute;
    right:0;
    top:50%;
  }

  #collapseButton{
    border: solid #aca687;
    background-color: #7e6880;
    padding: 20px;
    border-radius: 50%;
  }

  button:focus{
    outline: none;
  }

  .location > ::placeholder{
    color:#93cd7c
  }

  .location{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 5%;
  }

  .location > input{
    display: block;
    height: 100%;
    width: 90%;
    position: absolute;
    background-color: #806c7f;
    border: solid #939540;
    color: #87aeb8;
    font-weight: bold;
    font-size: large;
  }

</style>
