const express = require("express");

const db = require("./data/db.js");
const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("Testing Server");
// });

// GET REQUEST
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  let id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});
// END GET

// START POST

let nextId = 10;
let posts = [
  {
    id: nextId,
    title: "The post title",
    contents: "The post contents"
  }
];

server.post("/api/posts", (req, res) => {
  const post = req.body;
  post.id = nextId++;
  post.title = `Title number ${post.id}`;
  post.contents = `Contents number ${post.id}`;

  ///////////////////////////
  // this kind of work below
  // const post = req.body;
  // post.id = nextId++;

  // posts.push(post);
  // res.status(201).json(posts);
  // stop kind of works
  //////////////////////////////

  db.insert(post)
    .then(post => {
      console.log("POSTNEW", newPost.title);
      // if (post.title === 0) {
      //   res
      //     .status(404)
      //     .json({ message: "The post with the specified ID does not exist." });
      // }
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("\n== API on port 8k === \n"));
