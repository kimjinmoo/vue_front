<template>
  <div id="myCarousel" class="carousel slide text-center" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/resource/img/index/jenkins.jpeg" alt="First slide">
        <div class="container">
          <div class="carousel-caption text-left">
            <h1>Jenkins 세팅</h1>
            <p>세팅 정보 안내</p>
            <p><a href="#">젠키스 보러가기</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/resource/img/index/docker.png" alt="Second slide">
        <div class="container">
          <div class="carousel-caption">
            <h1>docker 세팅</h1>
          </div>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script>
  export default {
    name: 'headMenu'
  }
</script>