const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const OK = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];



const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests


  
  server.post('/posts',function (req,res){
    const title = req.body.title;
    const contents = req.body.contents;
    if (!title || !contents) {
      res.status(STATUS_USER_ERROR);
      res.json({ err: 'Must provide a title and content' });
      return;
    }
  
  });
  
  module.exports = { posts, server };