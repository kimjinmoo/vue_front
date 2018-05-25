<template>
  <div class="container-fluid">
    <b-jumbotron header="영화찾기" lead="좌표를 이용한 근방의 영화 찾기" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" to="/lab/movie">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="Selenium Session" lead="Selenium" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="http://13.124.113.142:9200/wd/hub/" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="스웨거 API" lead="API 목록" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="https://conf.grepiu.com/swagger-ui.html" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="Jenkins" lead="배포" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="http://13.124.113.142:9000/" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="WebSocket" lead="Websocket을 이용한 Push" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="https://conf.grepiu.com" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="Slack" lead="슬랙" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">More Info</b-btn>
    </b-jumbotron>

    <b-carousel id="slider"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide :caption="item.title" :text="item.description" :img-src="item.imageUrl"
                        v-bind:data-slide-to="item.id" v-for="(item, index) in slideLists"
                        :key="item.id" :class="{'active': index === 0}" class="fixImg">
        <p>
          <router-link :to="item.url">보러가기</router-link>
        </p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name : "Lap",
    data : function() {
      return {
        slide: 0,
        sliding: null,
        slideLists: []
      }
    },
    created : function() {
      // 슬라이드 화면을 불러온다.
      axios.get("/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      });
    },
    methods : {
      onSlideStart : function() {
        this.sliding = true
      },
      onSlideEnd : function() {
        this.sliding = false
      }
    }
  }
</script>
<style>
  .fixImg {
    max-height: 400px;
    max-width: 400px;
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
    font-size: 35px;
    color: red;
  }
  .carousel-control-prev-icon:after {
    background-image: none;
    content: '<';
    font-size: 35px;
    color: red;
  }
</style>