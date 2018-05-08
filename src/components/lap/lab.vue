<template>
  <div class="container-fluid">
    <b-jumbotron header="영화찾기" lead="좌표를 이용한 근방의 영화 찾기" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" to="/lab/movie">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="스웨거 API" lead="API 목록" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="http://conf.grepiu.com/swagger-ui.html" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="Jenkins" lead="배포" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="http://13.124.113.142:9000/" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="WebSocket" lead="Websocket을 이용한 Push" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="http://conf.grepiu.com" target="_blank">More Info</b-btn>
    </b-jumbotron>
    <b-jumbotron header="Slack" lead="슬랙" >
      <p>확인 하시려면 more Info 클릭</p>
      <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">More Info</b-btn>
    </b-jumbotron>
  </div>
</template>
<script>
  export default {
    name : "Lap"
  }
</script>