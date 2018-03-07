const bodyParser = require('body-parser');
const express = require('express');
const STATUS_SUCCESS = 200;  //OK
const STATUS_USER_ERROR = 422; //Unprocessable Entity
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
//const posts = [];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
// TODO: your code to handle requests
let posts = [
  {
    id: 0,
    title: "First post title",
    contents: "First post contents"
  },
  {
    id: 1,
    title: "Second post title",
    contents: "Second post contents"
  },
  {
    id: 2,
    title: "Third post title",
    contents: "Third post contents"
  }
]
server.get("/users/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(200);
  res.send(posts[id])
});
server.get('/posts/:term/', (req, res) => {
  const{
    term
  } = req.params;
console.log("TT",term)
// /posts/blue
  let result=[];
  if (term) {
    for (let post in posts){
      if(post.title.toLowerCase().includes(term.toLowerCase())
      || post.contents.toLowerCase().includes(term.toLowerCase())){
        result.push(posts[post]);
      }
      
    }
  
    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send(posts);
  }
  if(result===[]){
    res.status(STATUS_SUCCESS);
    res.send(posts);
    
  }
});
/*
server.post('/', (req, res) => {
  const {
  }
  if (!req.___._____) {
    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});
server.put('/__', (req, res) => {
  if (!req.___._____) {
    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});
server.delete('/__', (req, res) => {
  if (!req.___._____) {
    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});
*/
module.exports = { posts, server };