<template>
  <main role="main" class="container">
    <div id="home-slide" class="carousel slide text-center" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#home-slide" v-bind:data-slide-to="item.id" v-for="(item, index) in slideLists" :key="item.id" :class="{'active': index === 0}"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(item, index) in slideLists" :key="item.id" :class="{'active': index === 0}">
          <img :src="item.imageUrl" class="" :alt="item.alt">
          <div class="container">
            <div class="carousel-caption text-left">
              <h1>{{item.title}}}</h1>
              <p>{{item.description}}</p>
              <p><a :href="item.url">보러가기</a></p>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#home-slide" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">이전</span>
      </a>
      <a class="carousel-control-next" href="#home-slide" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">다음</span>
      </a>
    </div>
  </main>
</template>
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
  import axios from 'axios'

  export default {
    name: 'home',
    props : {
      title : String,
      isLogin : Boolean
    },
    data() {
      return {
        slideLists : []
      }
    },
    created() {
      axios.get("/fake/slideData.json")
      .then((response) => {
        console.log("success : " + JSON.stringify(response));
        this.slideLists = response.data.slideLists;
      })
      .catch((err)=>{
        console.log("err");
      })
    }
  }
</script>
<style>
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
</style>