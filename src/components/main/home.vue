<template>
  <div class="container-fluid">
    <div class="grp bg_00">
      <p class="day_text">{{nowData}}</p>
      <p class="time_text">{{nowTime}}</p>
      <p class="text_commandBar">{{commandBar}}</p>
    </div>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
  import axios from 'axios'

  export default {
    name: 'Home',
    props : {
      title : String
    },
    data : function() {
      return {
        nowData : "",
        nowTime : "",
        interval: false,
        commandBar : "_",
        commandCount : 1,
        commandTexts : [
            "hi!",
            ""
        ],
        startDelayTime : 1000
      }
    },
    created : function() {
      // 시간을 표출 한다.
      setInterval(()=>{
        this.animation_command();
      },300)
      setTimeout(()=>{
        // setInterval(()=>{
        //   var today = new Date();
        //   var h = today.getHours();
        //   var m = today.getMinutes();
        //   var s = today.getSeconds();
        //   this.nowData = today.getFullYear() + "." + this.zero(today.getMonth()+1) + "." + this.zero(today.getDate())
        //   this.nowTime =  this.zero(h) + ":" + this.zero(m) + ":" + this.zero(s);
        // }, 500)
      }, this.startDelayTime)
    },
    methods : {
      animation_command : function(){
        if(this.commandBar == "_"){
          this.commandBar = "";
        } else {
          this.commandBar = "_";
        }
        this.commandCount++;
      },
      zero : function(number) {
        var d = "0000000000"+number;
        return d.substr(d.length-2, d.length);
      }
    }
  }
</script>
<style>
  @media (max-width: 575px) {
    .grp {
      width : 100%;
      height : 400px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 576px) {
    .grp {
      width : 100%;
      height : 400px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 768px) {
    .grp {
      width : 100%;
      height : 400px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 992px) {
    .grp {
      width : 100%;
      height : 590px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 1200px) {
    .grp {
      width : 100%;
      height : 770px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }

  .grp .day_text {
    color: white;
    text-align: left;
    font-size: 2vw;
    margin-left: 16px;
  }
  .grp .time_text {
    color: white;
    text-align: center;
    font-size: 20vw;
  }
  .grp .text_commandBar {
    position: absolute;
    bottom: 0;
    color: white;
    margin-top: 0px;
    margin-left: 16px;
    font-size: 4vw;
  }
  .grp .bg_gray{
    background-color: whitesmoke;
  }
  .grp .bg_write{
    background-color: white;
  }
  .weatherEffect {
    display: none;
  }
</style>