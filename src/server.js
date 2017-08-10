const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.


const posts = [];

let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// /////////////////////////
// ROUTES
// //////////////////////////

// GET ROUTE R
server.get("/posts", (req, res) => {
  console.log("hey");
  res.json({ posts });
});

// POST ROUTE C
server.post("/posts", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title value'});
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a contents value'});
    return;
  }
  id++;
  const newPost = { title, contents, id};
  posts.push(newPost);
  
  res.json({ posts });
});

// PUT ROUTE U
server.put("/posts", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const postNum = req.body.id;
  const updatedPost = {title, contents, id: postNum};
  console.log(updatedPost);
  if (!postNum) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an id value'});
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title value'});
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a contents value'});
    return;
  }
  let index;
  const indexer = () => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postNum) {
        index = i;
        return index;
      }
    }
    index = false;
    return index;
  };
  indexer();
  if (!index) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide valid id' });
    return;
  }
  
  posts[index] = updatedPost;
  console.log(updatedPost);
  res.json({ posts });
});

// DELETE ROUTE D
server.delete("/posts", (req, res) => {
  res.send("Hi from Delete");
});

module.exports = { posts, server };
