<template>
  <div class="container-fluid">
    <b-alert dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">{{message}}</b-alert>
    <b-button v-on:click="setMyLocation">위치 찾기</b-button>
    <p>lat : {{center.lat}} / lng : {{center.lng}}</p>
    <!--:dragend="myPosition"-->
    <!--@center_changed="updateCenter"-->
    <GmapMap :center="center"
             :zoom="zoom"
             style="min-width: 300px; min-height: 400px"
             ref="mapRef"
             @drag="onDrag"
             @dragend="onDragend"
    >
      <GmapMarker
          :key="m.id"
          v-for="(m) in markers"
          :position="m.position"
          :title="m.storeName"
          :clickable="true"
          :draggable="false"
          :InfoWindow="m.storeName"
          @click="onMarker(m.storeName, m.position)"
      />
      <gmap-info-window :position="myPosition">
        현재 나의 위치!!
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
<script>
  var MobileDetect = require('mobile-detect'),md = new MobileDetect(navigator.userAgent);
  import axios from 'axios'
  // vue google map
  // ref : https://developers.google.com/maps/documentation/javascript/events?hl=ko
  // ref : https://github.com/heavyy/vue2-google-maps/blob/master/API.md

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
        zoom : 3,
        message : "",
        showDismissibleAlert : false
      }
    },
    methods : {
      onDrag() {
        console.log("onDrag...");
      },
      onDragend() {
        this.$refs.mapRef.$mapPromise.then((map) => {
          this.center.lat =  map.getCenter().lat();
          this.center.lng =  map.getCenter().lng();
        });
        console.log("drag call");
      },
      onMarker(storeName, position) {
        this.center = position;
        this.zoom = 18;
      },
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
            this.myPosition.lat = coordinates.lat;
            this.myPosition.lng = coordinates.lng;
            this.center.lat = coordinates.lat;
            this.center.lng = coordinates.lng;
            this.zoom = 17;
            this.$parent.showLoading(false);
          });
        } else {
          this.message = "Web에서 지원하지 않습니다.";
          this.center.lat = 0;
          this.center.lng = 0;
          this.$parent.showLoading(false);
        }

      }

    },
    beforeCreate() {
      this.$parent.showLoading(true);
      axios.get("https://conf.grepiu.com/sample/crawler/lotteCineLocale")
      .then((response) => {
        let map = [];
        for(var inx in response.data) {
          let item = response.data[inx];
          let lat = item.location == null?0:item.location.y;
          let lng = item.location == null?0:item.location.x;
          map.push({"position" : {"lng" : lng, "lat" : lat}, "storeName" : item.storeName})
        }
        this.markers = map;
      })
      .catch((e)=>{
        console.log(e);
      })
    },
    created() {
      if(md.is("iPhone")) {
        this.showDismissibleAlert = true;
        this.message = "아이폰 설정 >> 개인 정보 보호 >> 위치 서비스 >> Safari 웹 사이트 >> 안함-> 앱을 사용하는 동안 체크";
      }
      this.findMyLocation();
    }
  };
</script>
