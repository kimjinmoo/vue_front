<template>
  <div class="container-fluid">
      <carousel id="ca" :loop="true" :perPage="1" :spacePadding="2">
        <b-tooltip :show.sync="carousel.tooltip" target="ca" placement="top">
          마우스 <strong>swipe!!</strong>
        </b-tooltip>
        <slide class="label bg movie">
          <div class="head">영화찾기</div>
          <div class="content">
            <p>좌표를 이용한 근방의 영화 찾기</p>
          </div>
          <div class="more">
            <b-btn variant="primary" to="/lab/movie">확인하기</b-btn>
          </div>
        </slide>
        <slide class="label bg jenkins">
          <div class="head">Jenkins</div>
          <div class="content">
            <p>CI 배포</p>
          </div>
          <div class="more">
            <b-btn variant="primary" href="http://13.124.113.142:9000/" target="_blank">확인하기(새창)</b-btn>
          </div>
        </slide>
        <slide class="label bg selenium">
          <div class="head">Selenium Session</div>
          <div class="content"><p>크롤링 및 Test 자동화</p></div>
          <div class="more"><b-btn variant="primary" href="http://13.124.113.142:9200/wd/hub/" target="_blank">확인하기(새창)</b-btn></div>
        </slide>
        <slide class="label bg swagger">
          <div class="head">스웨거 API</div>
          <div class="content"><p>API 문서 자동화</p></div>
          <div  class="more"><b-btn variant="primary" href="https://conf.grepiu.com/swagger-ui.html" target="_blank">확인하기(새창)</b-btn></div>
        </slide>
        <slide class="label bg websocket">
          <div class="head">WebSocket</div>
          <div class="content"><p>Websocket을 이용한 Push</p></div>
          <div class="more">
            <b-btn variant="primary" href="https://conf.grepiu.com" target="_blank">확인하기(새창)</b-btn>
          </div>

        </slide>
        <slide class="label bg slack">
          <div class="head">Slack</div>
          <div class="content"><p>개발 도구</p></div>
          <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">확인하기(새창)</b-btn>
        </slide>
      </carousel>
    <div style="width: 98%; margin : auto; padding: 10px;">
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name : "Lap",
    data : function() {
      return {
        carousel : {
          tooltip : false,
          nextLabel : ">",
          prevLabel : "<"
        },
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
    computed : {
      currentIndex: {
        cache: false,
        get() {
          return this.$refs.carousel ? this.$refs.carousel.currentPage : 0;
        }
      }
    },
    watch : {
      '$refs.carousel.currentPage' : function() {
        console.log("watch!!");
        if (this.currentPage !== this.$refs.carousel.currentPage) {
          console.log(this.currentPage);
        }
      }
    },
    methods : {
      onPageChange : function(val) {
        console.log('change', val)
      },
      handleSlideClick : function(dataset) {
        console.log(dataset.index, dataset.name);
      }
    }
  }
</script>
<style>
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    padding: 0;
    overflow: auto;
    margin: 0;
    -webkit-overflow-scrolling: touch;
  }
  @media (max-width: 575px) {
    .label {
      vertical-align: top; /* here */
      width : 50%;
      height : 230px;
    }
  }
  @media (min-width: 576px) {
    .label {
      vertical-align: top; /* here */
      width : 50%;
      height : 230px;
    }
  }
  @media (min-width: 768px) {
    .label {
      vertical-align: top; /* here */
      width : 50%;
      height : 333px;
    }
  }
  @media (min-width: 992px) {
    .label {
      vertical-align: top; /* here */
      width : 50%;
      height : 300px;
    }
  }
  @media (min-width: 1200px) {
    .label {
      vertical-align: top; /* here */
      width : 50%;
      height : 400px;
    }
  }

  .bg {
    width: 100%;
    height: auto;
    background-size: cover;
    background-position: left top;
    background-repeat: no-repeat;
  }
  .movie {
    background-image: url("/img/bg/cinema-3218422_1920.jpg");
  }

  .jenkins {
    background-image: url("/img/bg/puzzle-226743_1920.jpg");
  }

  .selenium {
    background-image: url("/img/bg/arranged-1842261_1920.jpg");
  }

  .swagger {
    background-image: url("/img/bg/document-3268750_1920.jpg");
  }

  .websocket {
    background-image: url("/img/bg/feedback-1825515_1920.jpg");
  }

  .slack {
    background-image: url("/img/bg/logo-2563719_1920.jpg");
  }

  .head {
    color: #ffffff;
    font-size: 8vw;
    text-align: center;
  }
  .content {
    color: #f0f0f0;
    font-size: 3vw;
    text-align: center;
  }
  .more {
    bottom: 0;
    left: 0;
    margin: 1vw;
    font-size: 2vw;
    text-align: center;
  }
</style>