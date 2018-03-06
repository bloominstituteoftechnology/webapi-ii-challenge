const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let idCounter = posts.length + 1;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term) {
    let matching = [];
    posts.forEach(function(element) {
      if (Object.values(element).includes(req.query.term.replace(/"/g,""))){
        matching.push(element);
      }
    })
    res.send(matching);
  } else {
    res.status(STATUS_SUCCESS);
    res.send(posts)
  }
})

server.post('/posts', (req, res) => {
  const clientProvided = req.body;
  if (clientProvided.content && clientProvided.title) {
    clientProvided.id = idCounter++;
    posts.push(clientProvided);
    res.status(STATUS_SUCCESS);
    res.send(clientProvided);
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "error" })
  }
})

module.exports = { posts, server };
