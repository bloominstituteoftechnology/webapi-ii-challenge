const bodyParser = require('body-parser');
const express = require('express');
const STATUS_USER_ERROR = 422;

const posts = [
  {
    title: "",
  content: "",
},

];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
// TODO: your code to handle requests
server.get("/posts", (req,res) => {
if (req.query.term) {
  let searchPosts = []; // initialize arr. for searched query
   // if the post's title OR it's contents = query then push only those posts to the searchPosts array.
  posts.forEach(post => {
    if(post.title.includes(req.query) || post.contents.include(req.query)) 
    searchPosts.push(post)
  }) 
  return res.send(searchPosts);
//otherwise just send all posts
} else res.send(posts);
});

server.post 









module.exports = { posts, server };
