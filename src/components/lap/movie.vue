<template>
  <div class="container-fluid">
    <b-alert dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">{{message}}</b-alert>
    <b-button v-on:click="setMyLocation">위치 찾기</b-button>
    <p>lat : {{center.lat}} / long : {{center.lng}}</p>
    <!--:dragend="myPosition"-->
    <!--@center_changed="updateCenter"-->
    <GmapMap :center="center"
             :zoom="zoom"
             style="min-width: 300px; min-height: 400px">
      <GmapMarker
          :key="m.id"
          v-for="(m) in markers"
          :position="m.position"
          :title="m.storeName"
          :clickable="true"
          :draggable="false"
      />
      <gmap-info-window :position="myPosition">
        Here
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
<script>
  var MobileDetect = require('mobile-detect'),md = new MobileDetect(navigator.userAgent);
  import axios from 'axios'

  export default {
    name : "movie",
    data() {
      return {
        markers : [],
        myPosition : {
          lat : 0,
          lng : 0
        },
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
      updateCenter(center) {
        this.center = {
          lat: center.lat(),
          lng: center.lng()
        }
      },
      getInfo(m) {
        console.log("click : " + JSON.stringify(m))
      },
      setMyLocation() {
        this.center.lat = this.myPosition.lat;
        this.center.lng = this.myPosition.lng;
      },
      findMyLocation() {
        if(navigator.geolocation){
          this.$getLocation()
          .then(coordinates => {
            console.log("lat : " + coordinates.lat);
            console.log("lng : " + coordinates.lng);
            this.myPosition.lat = coordinates.lat;
            this.myPosition.lng = coordinates.lng;
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
    beforeCreate() {
      axios.get("https://conf.grepiu.com/sample/crawler/lotteCineLocale")
      .then((response) => {
        this.markers = response.data;
      })
      .catch((e)=>{
        console.log(e);
      })
    },
    mounted() {
      if(md.is("iPhone")) {
        this.showDismissibleAlert = true;
        this.message = "아이폰 설정 >> 개인 정보 보호 >> 위치 서비스 >> Safari 웹 사이트 >> 안함-> 앱을 사용하는 동안 체크";
      }
      this.findMyLocation();
    }
  };
</script>