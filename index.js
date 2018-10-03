// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(cors());
var bodyParser = require("body-parser");

// configure the app to use bodyParser()
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello from Anthony's first server!!!</h1>");
});

// server.get("/api/contact", (req, res) => {});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("POSTS", posts);
      res.status(200).json(posts);
    })
    .catch(error => res.status(500).json({ error: "Can't retrieve posts..." }));
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      console.log("POST", post);
      res.json(post);
    })
    .catch(error => res.send(error));
});

server.post("/api/posts", (req, res) => {
  console.log(req.params);
  //   console.log(req);
  console.log(req.body);
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        // console.log(post);
        if (!post) {
          return res
            .status(422)
            .send({ Error: `Post does not exist by this id: ${id}` });
        }
        res.status(201).json(newPost);
      });
    })
    .catch(err =>
      res.status(500).json({
        error: "an error occurred while saving the post to the database"
      })
    );
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deletePost => {
      if (deletePost) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res
          .status(404)
          .json({ error: `The post with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove post" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.update(id, newPost)
    .then(post => {
      res.status(200).json(post);
      if (post) {
        res.status(200).json(newPost);
      } else {
        res
          .status(404)
          .json({ error: `The post with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This post cannot be changed" });
    });
});
const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
