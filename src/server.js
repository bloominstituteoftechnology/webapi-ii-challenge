/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const USER_ERROR_OBJECT = { error: "422: Unprocessable Entity" }

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ id: 0, title: 'First post', content: "I like turtles" }, { id: 1, title: 'Doge 1', content: "MacGruber" }];
let postCounter = 2;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/", (req, res) => {
  res.send("testeroo!");
})

server.get("/posts", (req, res) => {
  let term = req.query.term;

  if (!term) {
    res.json(posts);
    res.end();
  }

  posts.forEach(post => {
    term = term.toLowerCase();
    let title = post.title.toLowerCase().split(" ");
    let content = post.content.toLowerCase().split(" ");
    if (title.indexOf(term) > -1 || content.indexOf(term) > -1) {
      console.log("Result found!")
      res.json(post);
      res.end();
    };
  })

  console.log("No result found");
  res.status(STATUS_USER_ERROR);
  res.send("No matching term was found!");
})

server.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(STATUS_USER_ERROR);
    res.json(USER_ERROR_OBJECT);
    res.end();
  }

  const newPost = {
    id: postCounter,
    title: req.body.title,
    content: req.body.content
  }

  posts.push(newPost);
  postCounter++;
  res.json(newPost);
})

server.put("/posts", (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.id){
        res.status(STATUS_USER_ERROR);
        res.json(USER_ERROR_OBJECT);
    }

    posts.forEach(post => {
        if (post.id === req.body.id){
            post.title = req.body.title;
            post.content = req.body.content;
            res.json(post);
            res.end();
        }
    })

    res.status(STATUS_USER_ERROR);
        res.json(USER_ERROR_OBJECT);
})

server.delete("/posts/:id", (req, res) => {
    const delId = parseInt(req.params.id);
    let currentIndex;

    posts.forEach(post => {
        if (post.id === delId){
            currentIndex = posts.indexOf(post);
            posts.splice(currentIndex, 1);
            res.json({ success: true });
            res.end();
        }
    })

    res.status(STATUS_USER_ERROR);
    res.send(USER_ERROR_OBJECT);
})

module.exports = { posts, server };