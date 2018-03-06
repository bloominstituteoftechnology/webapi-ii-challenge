const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;  //OK
const STATUS_USER_ERROR = 422; //Unprocessable Entity

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
let posts = [
  {
    id: 0,
    title: "First post title",
    content: "First post content"
  },
  {
    id: 1,
    title: "Second post title",
    content: "Second post content"
  },
  {
    id: 2,
    title: "Third post title",
    content: "Third post content"
  }
]
server.get('/posts/:term', (req, res) => {
  const {
    term
  } =req.params;
  // console.log("Third",term);
  //  '/posts/blue' in browser
  let result=[];  // holds all hits.
  if (term) { 
    // some code here
    for (let post in posts){
      if(post.title.toLowerCase().includes(term.toLowerCase())
      || (post.content.toLowerCase().includes(term.toLowerCase())))
      result.push(posts[post]);
    }
  }  else {
    res.status(STATUS_SUCCESS);
    res.send(posts); // sends everything if no match
  }
  if(result===[]){
    res.status(STATUS_SUCCESS);
    res.send(posts); // sends everything if no match
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
  if result=[]
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
