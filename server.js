// import your node modules

const bodyParser = require("body-parser");
const express = require("express");
const db = require("./data/db");
const server = express();
const port = 5000;

server.use(bodyParser.json());

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db
    .find()
    .than(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ errormsg: "This post could not be found" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.param;
  db
    .findById(id)
    .than(post => {
      if (post.length > 0) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({ msg: "No post found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The post with that specified ID does not exist." });
    });
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    const obj = db
      .insert({ title, contents })
      .then(response => {
        res.status(201).json({ id: response.id, title, contents });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  } else {
    res.status(400).json({
      message: "Insert a title and contents for the post"
    });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      if (response != 0) {
        res.status(200).json({ response: "Post Deleted" });
      } else {
        res.status(404).json({
          errorMessage: "The post does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The post could not be deleted" });
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
