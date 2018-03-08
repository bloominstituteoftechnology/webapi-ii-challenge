const bodyParser = require("body-parser");
const express = require("express");
/* eslint-disable */

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  { title: "first title", contents: "contents" },
  { title: "second", contents: "contents" },
  { title: "third title", contents: "contents" }
];

let idCounter = 2;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
// server.get("/posts", (req, res) => {
//   res.status(200);
//   res.json(posts);
// });

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    const filteredPosts = posts.filter(post => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.status(200);
    res.send(filteredPosts);
  } else {
    res.status(200);
    res.json(posts);
  }
});

server.post("/posts", (req, res) => {
  if (req.body.title && !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You did not provide a title" });
  }
  if (!req.body.title && req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You did not provide contents" });
  }
  if (!req.body.title && !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You did not provide both title and contents" });
  }
  let { title, contents } = req.body;
  idCounter++;
  let newPost = {
    title: title,
    contents: contents,
    id: idCounter
  };
  posts.push(newPost);
  res.status(200);
  res.json(newPost);
});

server.put("/posts", (req, res) => {
  let { title, contents, id } = req.body;
  let updatedPost = {
    title: title,
    contents: contents,
    id: id
  };
  let postsId = posts.map(post => post.id);

  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You did not include an ID, Title and Contents" });
  }
  if (!postsId.includes(id)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Invalid ID" });
  }
  if (title && contents && id) {
    posts = posts.filter(post => {
      return post.id !== id;
    });
    posts.push(updatedPost);
    res.status(200);
    res.json(updatedPost);
  }
});

server.delete("/posts", (req, res) => {
  let { id } = req.body;
  let postsId = posts.map(post => post.id);
  if (id && postsId.includes(id)) {
    posts = posts.filter(post => !(post.id === id));
    res.status(200);
    res.json({ success: true });
  }
  if (id && !postsId.includes(id)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "No post with that ID exists!" });
  }
  if (!id || id === null) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You did not provide an id!" });
  }
});

module.exports = { posts, server };
