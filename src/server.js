const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    id: "1",
    title: "The post title",
    contents: "The post contents"
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get("/posts", (req, res) => {
  let getResult = posts.filter(post => {
    if (
      post.title.includes(req.query.term) ||
      post.contents.includes(req.query.term)
    ) {
      return true;
    } else {
      return false;
    }
  });
  res.status(200).json(getResult);
});

let count = 0;

server.post("/posts", (req, res) => {
  //  console.log("req.body is ", req);
  if (!req.body.title || !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must provide a title and contents" });
    return;
  }
  count++;
  let countToString = count.toString();
  posts.push({
    id: countToString,
    title: req.body.title,
    contents: req.body.contents
  });
  res.status(200).json({ posts });
  // console.log("count", count);
});

server.put("/posts", (req, res) => {
  // console.log("put req.body is ", req.body);
  if (!req.body.id || !req.body.title || !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must provide id, title, and contents" });
    return;
  }
  //  console.log("put posts ", posts);
  //  console.log("req.query.term", req.body);
  let putResult = posts.filter(post => {
    if (post.id.includes(req.body.id.toString())) {
      return true;
    }
  });
  console.log("put result", putResult);

  if (putResult.length === 0) {
    console.log("if block", "hi");
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must provide an id" });
    return;
  }
  putResult[0].title = req.body.title;
  putResult[0].contents = req.body.contents;
  res.status(201).json(putResult[0]);
});

server.delete("/posts", (req, res) => {
  let deleteResult = posts.findIndex(post => {
    if (post.id.includes(req.body.id.toString())) {
      return true;
    }
  });
  if (deleteResult === null) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must provide an id" });
    return;
  }
  // console.log('delete result', deleteResult);
  posts.splice(deleteResult, 1);
  res.status(422).json({ success: true });
});

module.exports = { posts, server };
