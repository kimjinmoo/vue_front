<template>
  <div class="container-fluid" style="padding: 0px;">
    <div class="grp bg_00">
      <p class="day_text">{{nowData}}</p>
      <p class="time_text">{{nowTime}}</p>
    </div>
    <!--<b-carousel id="slider"-->
                <!--style="text-shadow: 1px 1px 2px #333;"-->
                <!--controls-->
                <!--indicators-->
                <!--background="#ababab"-->
                <!--:interval="4000"-->
                <!--img-width="1024"-->
                <!--img-height="480"-->
                <!--v-model="slide"-->
                <!--@sliding-start="onSlideStart"-->
                <!--@sliding-end="onSlideEnd"-->
    <!--&gt;-->
      <!--<b-carousel-slide :caption="item.title" :text="item.description" :img-src="item.imageUrl" v-bind:data-slide-to="item.id" v-for="(item, index) in slideLists" :key="item.id" :class="{'active': index === 0}" class="fixImg">-->
        <!--<p><router-link :to="item.url">보러가기</router-link></p>-->
      <!--</b-carousel-slide>-->
    <!--</b-carousel>-->
    <!--<div class="grp bg_write">-->
      <!--<div class="rain front-row" v-html="frontRain"></div>-->
      <!-- 세션 -->
      <!--<section class="py-5">-->
        <!--<div v-for="(item) in sectionLists" :key="item.id">-->
          <!--<h1>{{item.title}}</h1>-->
          <!--<p>{{item.description}}-->
            <!--<b-button size="sm" variant="outline-success">이동</b-button>-->
          <!--</p>-->
        <!--</div>-->
      <!--</section>-->
    <!--</div>-->

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
    data() {
      return {
        nowData : "읽는중...",
        nowTime : "읽는중...",
        slide: 0,
        sliding: null,
        slideLists : [],
        sectionLists : [],
        interval: false
      }
    },
    created() {
      // 시간을 표출 한다.
      setInterval(()=>{
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        this.nowData = today.getFullYear() + "." + this.zero(today.getMonth()+1) + "." + this.zero(today.getDate())
        this.nowTime =  this.zero(h) + ":" + this.zero(m) + ":" + this.zero(s);
      }, 1000)
      // 슬라이드 화면을 불러온다.
      axios.get("/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      })
      // 세션 text를 불러온다.
      axios.get("/fake/sectionData.json")
      .then((response) => {
        this.sectionLists = response.data.sectionLists;
      }).catch(()=>{

      });
    },
    methods : {
      zero(number) {
        var d = "0000000000"+number;
        return d.substr(d.length-2, d.length);
      },
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    }
  }
</script>
<style>
  .fixImg {
    max-height: 100%;
    max-width: 100%;
  }
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    height: 100px;
    width: 100px;
    background-size: 100%, 100%;
    background-image: none;
  }
  .carousel-control-next-icon:after
  {
    background-image: none;
    content: '>';
    font-size: 75px;
    color: red;
  }

  .carousel-control-prev-icon:after {
    background-image: none;
    content: '<';
    font-size: 75px;
    color: red;
  }
  .grp {
    width : 100%;
    max-height : max-content;
  }
  .bg_00 {
    background : url('/img/bg/bg00.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size:     cover;
    #opacity: 0.5!important; filter:alpha(opacity=50);
  }
  .grp .day_text {
    position: absolute;
    color: white;
    text-align: left;
    font-size: 2vw;
  }
  .grp .time_text {
    color: white;
    text-align: center;
    font-size: 23vw;
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