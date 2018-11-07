<template>
  <div class="hello">
    <div :key="item.id" v-for="(item, index) in stuff">
      <Card :key="index" 
            :order="index" 
            :post="item"
            :posts="stuff" 
            :current="current"
            :prev="prev"
            :next="next" />
    </div>
    <div class="buttons">
      <div class="button" @click="backward"><< </div>
      <div class="button" @click="forward">>></div>
    </div>
    <div class="addnew" 
         :class="{activeAdd: addQuote}"
         
         >
      
      <div class="quote"  :class="{active: addQuote}"  >
        
        <div class="orator" :class="{active: addQuote}">
          <div class="title">Orator</div>
          <input class="oratorinput" type="text" v-model="newQuote.orator"/>
        </div>
        
        <div class="title">Quote</div>
        <textarea class="quoteinput" v-model="newQuote.title"></textarea>
      </div>
     <div class="plusquote" :class="{hidden: addQuote}" @click="toggleAddQuote">+ New Quote</div>
     <div v-if="addQuote" class="submit" @click="postQuote">Submit</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Card from './Card.vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      stuff: [],
      topThree: [],
      current: 0,
      addQuote: false,
      newQuote: {
        orator: '',
        title: '',
        contents: 'Guess who said this'
      },
      next: () => {
          if(this.current < this.stuff.length-1){
          return this.current + 1
          }
        else{
          return 0
        }
      },
      prev: () => {
        if(this.current > 0){
         return this.current - 1
          }
        else{
          return this.stuff.length-1
        }
      }
      

    }
  }, 
  methods: {
    fetchData: function(){axios.get('http://localhost:9000/api/posts')
         .then(res => {console.log("Axios Call",res, this.stuff)
            this.stuff = res.data
         })
         .catch(err => console.log('Err',err));},
    forward: function(){ console.log(this.stuff.length)
        if(this.current < this.stuff.length-1){
          this.current += 1
          }
        else{
          this.current = 0
        }
    },
    backward: function(){
        if(this.current > 0){
          this.current -= 1
          }
        else{
          this.current = this.stuff.length-1
        }
    },
    toggleAddQuote: function(){
      this.addQuote = !this.addQuote
    },
    postQuote: function(){
      axios.post('http://localhost:9000/api/posts', this.newQuote)
      .then(res => {
        console.log('Post',res)
        this.newQuote = {
        orator: '',
        title: '',
        contents: 'Guess who said this'
      };
        this.fetchData()
      })
      .catch(err => console.log("Post err",err))
    }
  },
  created: function(){
    this.fetchData()
  },
  components: {
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.addnew {
  background: white;
  box-shadow: 1px 1px 1px 1px rgba(53, 73, 94, 0.418);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  border-radius: 50px;
  height: 40px;
  transition: 1s;

}
.hidden{
  display: none;

}
.activeAdd {
  height: 260px;
  border-radius: 15px;
  background: rgb(53, 73, 94);
  justify-content: flex-start;
  padding-top: 2px;
}
.plusquote{
  transition: .6s;
}

.plusquote:hover{
  color: #41B883;
  
  transition: .2s;
}
.orator {
  width: 90%;
  height: 40%;
  background: #41B883;
  display: none;
  justify-content: center;
  align-items: center;
  transition: 1s;
  border-radius: 15px;
  flex-direction: column;
  
}

.quote{

  width: 90%;
  padding-top: 5px;
  height: 85%;
  background: white;
  display: none;
  justify-content: flex-start;
  align-items: center;
  transition: 1s;
  border-radius: 15px;
  flex-direction: column;


}
.active{
  display: flex;
  
}

.oratorinput{
  height: 30px;
  border-radius: 30px;
  padding-left: 5px;
  outline: none;
  z-index: 10;

}

.quoteinput{
  height: 40%;
  resize: none;
  outline: none;
  border-radius: 15px;
  width: 80%;
  padding: 5px;
}
.submit{
  width: 80%;
  color: white;
  
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  font-weight: 800;
  cursor: pointer;
  transition: .3s;
}
.submit:hover{
background: rgba(255, 255, 255, 0.39);
}

/* vuegreen #41B883 */
.buttons{
  margin: 50px;
  display: flex;
  width: 20%;
  justify-content: space-between;
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

.button{
  width: 50px;
  height: 50px;
  background: white;
  border: lightgray solid 1px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
