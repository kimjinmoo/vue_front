<template>
  <div class="container-fluid">
    <b-alert dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">{{message}}</b-alert>
    <b-button v-on:click="getLocation">위치 찾기</b-button>
    <p>lat : {{center.lat}} </p>
    <p>long : {{center.lng}}</p>
    <GmapMap :center="center"
             :zoom="zoom"
             style="min-width: 300px; min-height: 400px"></GmapMap>
  </div>
</template>
<script>
  var MobileDetect = require('mobile-detect'),md = new MobileDetect(navigator.userAgent);

  export default {
    name : "movie",
    data() {
      return {
        center : {
          lat : 37.5665,
          lng : 126.9780
        },
        zoom : 7,
        message : "",
        showDismissibleAlert : false
      }
    },
    methods : {
      getLocation() {
        if(navigator.geolocation){
          this.$getLocation()
          .then(coordinates => {
            this.center.lat = coordinates.lat;
            this.center.lng = coordinates.lng;
            this.zoom = 17;
          });
        } else {
          this.message = "Web에서 지원하지 않습니다.";
          this.center.lat = 0;
          this.center.lng = 0;
        }
      }
    },
    mounted() {
      if(md.is("iPhone")) {
        this.showDismissibleAlert = true;
        this.message = "아이폰 설정 >> 개인 정보 보호 >> 위치 서비스 >> Safari 웹 사이트 >> 안함-> 앱을 사용하는 동안 체크";
      }
      this.getLocation();
    }
  };
</script>