<template>
  <div class="hello">
    <div :key="item.id" v-for="item in stuff">
      {{item}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      stuff: []
    }
  },
  methods: {
    fetchData: function(){axios.get('http://localhost:9000/api/posts')
         .then(res => {console.log("Axios Call",res, this.stuff)
            this.stuff = res.data
         })
         .catch(err => console.log('Err',err));}
  },
  created: function(){
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
