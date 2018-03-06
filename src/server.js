const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{title: "b",
              contents: "b"},
              {title: "ac",
              contents: "b"},
              {title: "b",
              contents: "cd"},
              {title: "e",
              contents: "f"} ];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const searchTerm = req.query.term;
  if (searchTerm === undefined) {
    res.send( { userPosts: posts } );
  } else {
    let newArr = [];
    posts.forEach(obj => {
      if (obj.title.includes(searchTerm) || obj.contents.includes(searchTerm)) {
        newArr.push(obj);
      }
    });
    if (newArr.length === 0) {
      res.send( { userPosts: posts } );
    } else {
      res.send( { userPosts: newArr } );
    }
  }
});

module.exports = { posts, server };
