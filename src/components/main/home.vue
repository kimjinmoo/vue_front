<template>
  <div>
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
      <b-carousel-slide :caption="item.title" :text="item.description" :img-src="item.imageUrl" v-bind:data-slide-to="item.id" v-for="(item, index) in slideLists" :key="item.id" :class="{'active': index === 0}" class="fixImg">
        <p><router-link :to="item.url">보러가기</router-link></p>
      </b-carousel-slide>
    </b-carousel>
    <!-- Page Content -->
    <section class="py-5">
      <div v-for="(item) in sectionLists" :key="item.id">
        <h1>{{item.title}}</h1>
        <p>{{item.description}}
          <b-button size="sm" variant="outline-success">이동</b-button>
        </p>
      </div>
    </section>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
  import axios from 'axios'

  export default {
    name: 'home',
    props : {
      title : String
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        slideLists : [],
        sectionLists : [],
        interval: false
      }
    },
    created() {
      axios.get("/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      })
      axios.get("/fake/sectionData.json")
      .then((response) => {
        this.sectionLists = response.data.sectionLists;
      }).catch(()=>{

      });
    },
    methods : {
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    }
  }
</script>
<style>
  .fixImg {
    max-height: 885px;
    max-width: 100%;
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