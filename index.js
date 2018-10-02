// import your node modules
const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");

const db = require("./data/db.js");

// add your server code starting here
const server = express();
const port = 80;
server.use(express.json());

server.use(cors());
console.log("hiiiii");
server.listen(port, () => {
  console.log("API running");
});

//POST new post
server.post("/api/posts", (req, res) => {
  //save post from request body
  const post = { title: "", contents: "" };
  post.title = req.body.title;
  post.contents = req.body.contents;

  if (
    post.title === "" ||
    post.title === undefined ||
    post.contents === "" ||
    post.contents === undefined
  ) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(post)
      .then(post => {
        res.status(201);
        db.findById(post.id)
          .then(post => res.json(post))
          .catch(err => {
            res.send({ error: "The post information could not be retrieved" });
          });
      })
      .catch(err => {
        error: "There was an error while saving the post to the database";
      });
  }
});
//GET all posts
server.get("/", (req, res) => {
  // do something
});

//GET all posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res.json({ error: "The posts information could not be retrieved" })
    );
});

//GET specific post
server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist" });
      }
      res.status(200).json(post);
    })
    .catch(err =>
      res.json({ error: "The post information could not be retrieved" })
    );
});

//DELETE specific post
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = db.findById(id);
  db.remove(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist" });
      } else
        res
          .status(200)
          .json({ message: `Post with ID ${id} has been removed` });
    })
    .catch(err => res.json({ error: "The post could not be removed" }));
});
