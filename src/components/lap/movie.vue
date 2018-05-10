<template>
  <div class="container-fluid">
    <b-alert dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">{{message}}</b-alert>
    <b-button-group>
      <b-button variant="success" v-on:click="setMyLocation">현재위치</b-button>
      <b-button variant="success" v-on:click="onNearLocation">지도 기준 근처 영화관 검색(10km이내)</b-button>
    </b-button-group>
    <p>lat : {{currentLatLng.lat}} / lng : {{currentLatLng.lng}}</p>
    <!--:dragend="myPosition"-->
    <!--@center_changed="updateCenter"-->
    <GmapMap :center="center"
             :zoom="zoom"
             style="min-width: 300px; min-height: 400px"
             ref="mapRef"
             @drag="onDrag"
             @dragend="onDragend"
             @center_changed="updateCenter"
    >
      <GmapMarker
          :key="m.id"
          v-for="(m) in markers"
          :position="m.position"
          :title="m.storeName"
          :clickable="true"
          :draggable="false"
          :InfoWindow="m.storeName"
          @click="onMarker(m.storeName, m.position)">
      </GmapMarker>
      <gmap-info-window :position="myPosition">
        현재 나의 위치!!
      </gmap-info-window>
    </GmapMap>
    <b-table striped hover :items="cineInfo"></b-table>
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
        nearIndex : 0,
        markers : [],
        cineInfo : [],
        myPosition : {
          lat : 0,
          lng : 0
        },
        currentLatLng : {
          lat : 37.5665,
          lng : 126.9780
        },
        center : {
          lat : 37.5665,
          lng : 126.9780
        },
        zoom : 15,
        message : "",
        showDismissibleAlert : false
      }
    },
    methods : {
      onDrag() {
        this.cineInfo = [];
        this.nearIndex = 0;
      },
      onDragend() {
        this.$refs.mapRef.$mapPromise.then((map) => {
          this.currentLatLng.lat =  map.getCenter().lat();
          this.currentLatLng.lng =  map.getCenter().lng();
        });
      },
      onMarker(storeName, position) {
        this.$refs.mapRef.panTo(position);
        axios.get("https://conf.grepiu.com/sample/crawler/lotteCine/"+storeName).then((res)=>{
          this.cineInfo = res.data;
        }).catch(()=>{
          this.nearIndex++;
          this.onNearLocation();
        });
      },
      updateCenter() {
      },
      getInfo(m) {
        console.log("click : " + JSON.stringify(m))
      },
      setMyLocation() {
        this.$refs.mapRef.panTo(this.myPosition);
      },
      onNearLocation() {
        axios.get("https://conf.grepiu.com/sample/crawler/find", {
          params: {
            lat: this.currentLatLng.lat,
            lng: this.currentLatLng.lng,
            distance: 10
          }
        }).then((res)=>{
          let item = res.data[this.nearIndex];
          let lat = item.location == null?0:item.location.y;
          let lng = item.location == null?0:item.location.x;
          let storeName = item.storeName;
          let position = {"lat" : lat , "lng" : lng};
          this.onMarker(storeName, position);
        }).catch((e)=>{
          console.log(e);
        })
      },
      findMyLocation() {
        if(navigator.geolocation){
          this.$getLocation()
          .then(coordinates => {
            // 현재 나의 위치 infoWindow
            this.myPosition.lat = coordinates.lat;
            this.myPosition.lng = coordinates.lng;
            // google Map Center
            this.center.lat = coordinates.lat;
            this.center.lng = coordinates.lng;
            // Lat Lng 좌표값
            this.currentLatLng.lat = coordinates.lat;
            this.currentLatLng.lng = coordinates.lng;
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
