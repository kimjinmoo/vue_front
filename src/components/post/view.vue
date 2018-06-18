<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab :title="subject" active>
          <div v-html="content"></div>
          <b-button @click="onList">목록</b-button>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  /**
   *
   * Vue Editor
   * https://www.npmjs.com/package/vue2-editor
   *
   */
  import axios from 'axios'
  import { VueEditor} from 'vue2-editor'

  export default {
    name: 'PostView',
    components: {
      VueEditor
    },
    data : function() {
      return {
        id : "",
        category : "",
        subject : "",
        content : "",
        editorSettings: {
          modules: {
            imageDrop: true,
            imageResize: {}
          }
        }
      }
    },
    methods : {
      onList : function() {
        this.$router.push("/post");
      }
    },
    created : function(){
      axios.get("https://conf.grepiu.com/sample/post/"+this.$route.params.id).then((r)=>{
        //this.content = r.data.content;
        console.log(JSON.stringify(r.data.content));
        this.content = r.data.content;
        this.subject = r.data.subject;
      }).catch(function(e){


        console.log(e);
      })
    }
  };
</script>