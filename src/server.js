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
});

server.post('/posts', (req, res) => {
  const clientProvided = req.body;
  if (clientProvided.content && clientProvided.title) {
    clientProvided.id = idCounter++;
    posts.push(clientProvided);
    res.status(STATUS_SUCCESS);
    res.send(clientProvided);
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "error" });
  }
});

server.delete('/posts', (req, res) => {
  const clientProvided = req.body;
  if (!clientProvided.id) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "NO ID error" });
  }
  posts.forEach((elem, i) => {
    if(clientProvided.id.toString() === elem["id"].toString()) {
      posts.splice(i, 1);
      res.status(STATUS_SUCCESS);
      res.send({ success: true });
    } else {
      res.status(STATUS_USER_ERROR);
      res.send({ error: "Post with that ID does not exist!"});
    }
  })
})

server.put('/posts', (req, res) => {
  const clientProvided = req.body;
  if(clientProvided.id && clientProvided.title && clientProvided.content) {
    const index = posts.findIndex((elem) => { return clientProvided.id.toString() === elem["id"].toString() } )
    if (index === -1 ) {
      res.status(STATUS_USER_ERROR);
      res.send({ error: "Post with that ID does not exist!"});
    } else {
      posts[index]["title"] = clientProvided.title;
      posts[index]["content"] = clientProvided.content;
      res.status(STATUS_SUCCESS);
      res.send(posts[index]);
    }
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "YOU ARE MISSING SOMETHING, COULD BE ANYTHING" });
  }
});

module.exports = { posts, server };
