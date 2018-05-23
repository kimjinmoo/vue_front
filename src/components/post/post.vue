<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="읽기" active>
          <section class="py-5">
            <div v-for="(item) in sectionLists" :key="item.id">
              <h1>{{item.title}}</h1>
              <p>{{item.description}}
                <b-button size="sm" variant="outline-success">이동</b-button>
              </p>
            </div>
          </section>
        </b-tab>
        <b-tab title="쓰기">
          Tab Contents 2
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "Post",
    data : function(){
      return {
        sectionLists: []
      }
    },
    created : function() {
      // 세션 text를 불러온다.
      axios.get("/fake/sectionData.json")
      .then((response) => {
        this.sectionLists = response.data.sectionLists;
      }).catch(()=>{

      });
    }
  }
</script>