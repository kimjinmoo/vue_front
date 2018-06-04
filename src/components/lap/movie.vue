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
    <!--@center_changed="updateCenter"-->
    <GmapMap :center="center"
             :zoom="zoom"
             style="min-width: 300px; min-height: 400px"
             ref="mapRef"
             @drag="onDrag"
             @dragend="onDragend"
    >
      <GmapMarker
          :icon="{url:'/img/cinema_lotte_icon.png',size: {width: 52, height: 52, f: 'px', b: 'px'},scaledSize: {width: 23, height: 23, f: 'px', b: 'px'}}"
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
    <h6>{{selectedStoreName}}</h6>
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
    data : function() {
      return {
        selectedStoreName : "",   // 선택된 스토어 정보
        nearIndex : 0, // 가까운 순위 인덱스 최초 0순위로 찾기 시작한다.
        markers : [],   // 마커, 영화관 위치를 표시힌다.
        cineInfo : [],  // 영화 정보
        myPosition : {  // 나의 위치
          lat : 0,
          lng : 0
        },
        currentLatLng : { // 현재 좌표
          lat : 37.5665,
          lng : 126.9780
        },
        center : {     // 지도상 가운데 위치의 좌표
          lat : 37.5665,
          lng : 126.9780
        },
        zoom : 15, // 지도의 Zoom 값
        message : "",
        showDismissibleAlert : false
      }
    },
    methods : {
      onDrag : function() {
        this.nearIndex = 0;
      },
      onDragend : function() {
        this.$refs.mapRef.$mapPromise.then((map) => {
          this.currentLatLng.lat =  map.getCenter().lat();
          this.currentLatLng.lng =  map.getCenter().lng();
        });
      },
      onMarker : function(storeName, position) {
        this.selectedStoreName = storeName;
        this.$refs.mapRef.panTo(position);
        axios.get("https://conf.grepiu.com/sample/crawler/lotteCine/"+storeName).then((res)=>{
          this.cineInfo = res.data;
        }).catch(()=>{
          this.nearIndex++;
          this.onNearLocation();
        });
      },
      updateCenter : function() {
      },
      getInfo : function(m) {
        console.log("click : " + JSON.stringify(m))
      },
      setMyLocation : function() {
        this.$refs.mapRef.panTo(this.myPosition);
      },
      onNearLocation : function() {
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
      findMyLocation : function() {
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
          });
        } else {
          this.message = "Web에서 지원하지 않습니다.";
          this.center.lat = 0;
          this.center.lng = 0;
        }

      }

    },
    beforeCreate : function() {
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
    created : function() {
      if(md.is("iPhone")) {
        this.showDismissibleAlert = true;
        this.message = "아이폰 설정 >> 개인 정보 보호 >> 위치 서비스 >> Safari 웹 사이트 >> 안함-> 앱을 사용하는 동안 체크";
      }
      this.findMyLocation();
    }
  };
</script>
