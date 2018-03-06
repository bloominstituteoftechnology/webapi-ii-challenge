const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    const filteredPosts = posts.filter(post => {
      return post.title.includes(term) || post.content.includes(term);
    });
    res.status(STATUS_SUCCESS);
    res.json(filteredPosts);
  } else {
    res.status(STATUS_SUCCESS);
    res.json(posts);
  }
});

server.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    id++;
    const post = { ...req.body, id };

    posts.push(post);
    res.status(STATUS_SUCCESS);
    res.json(post);
  } else {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Please provide a title and content." });
  }
});

server.put("/posts", (req, res) => {
  const { id, title, content } = req.body;

  if (title === undefined || content === undefined || id === undefined) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You may have forgotten something." });
  }
  let post = posts.find(info => {
    return info.id === id;
  });
  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "No post with that id." });
  }
  post.title = title;
  post.content = content;
  res.status(STATUS_SUCCESS);
  res.json(post);
});

server.delete("/posts", (req, res) => {});

module.exports = { posts, server };
