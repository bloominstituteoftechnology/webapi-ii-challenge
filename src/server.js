const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let uniqueID = 0;
let postArr = [{title: "test1", contents: "blah blah"}, {title: "test5", contents: "blah blah"}, {title: "test10", contents: "test1 blah"}];


server.get('/posts', (req, res) => {
  const term = req.query.term
  let indexArr = [];
  let filteredPosts = postArr.filter(post => post.title === term)
  if (filteredPosts.length === 0) {
    res.status(200);
    res.send(postArr);
  } else {
    res.status(200);
    res.send(filteredPosts);
  }
});

server.post('/posts', (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (title !== undefined && contents !== undefined) {
    const newPostObj = {
      title: title,
      contents: contents
    };
    postArr.push(newPostObj);
    res.status(200);
    res.send('theyre defined');
  } else {
    res.status(422);
    res.send('not defined');
  }

});

module.exports = { posts, server };
