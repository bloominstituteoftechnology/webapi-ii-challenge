const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
const SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.post("/posts", (req, res) => {
  const {title, contents} = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "User must provide a title"});
  } else if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "User must provide post contents"});
  } else {
    id++;
    posts.push([id, title, contents]);
    res.status(SUCCESS);
    res.json(id + "");
  }
});

server.get("/posts", (req, res) => {
  const term = req.query.term;
  if (!term) {
    const postContent = posts.map(post => post[1]);
    res.status(SUCCESS);
    res.json(postContent);
  } else {
    const containsTerm = posts.filter(post => {
      return post[1] === term;
    });
    res.status(SUCCESS);
    res.json(containsTerm);
    return;
  }
});

module.exports = { posts, server };
