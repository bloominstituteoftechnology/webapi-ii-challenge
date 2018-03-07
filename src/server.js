const bodyParser = require('body-parser');

const express = require('express');

const STATUS_USER_ERROR = 422;
const OK = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    id: 0,
    title: "Bill and Teds",
    contents: "Excellent Adventure",
  },

  {
    id: 1,
    title: "Horton",
    contents: "Hears a Who",
  },
];
const server = express();
server.use(bodyParser.json());
// to enable parsing of json bodies for post requests

server.get('/posts', (req, res) => {
  const title = req.query.title;
  const contents = req.query.contents;
  if (title || contents) {
    let filterPost = posts.filter(post => {
      return (post.title === title || post.contents === contents);
    })
    if (filterPost.length > 0) {
      res.status(ALL_GOOD);
      res.json({ filterPost });
      return;
    }
  }
  
  res.status(ALL_GOOD);
  res.json({ posts });
  return;
});
  
  

// TODO: your code to handle requests
  
  server.post('/posts',function(req,res){
    const title = posts.title;
    const contents = posts.contents;
    if ( contents === "" || title === "") {
      res.status(STATUS_USER_ERROR);
      res.json({ err: 'Must provide a title and content' });
      return;
    }
  
  });
  
  module.exports = { posts, server };