// import your node modules

const db = require("./data/db.js");
const cors = require('cors')

// add your server code starting here

const express = require("express");
const server = express();
server.use(express.json());
server.use(cors())

// ROOT GET

server.get("/", (req, res) => {
  res.json({ message: "No content here, please see /api/posts to begin" });
});

/// Get all objects from posts array.

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be received." });
    });
});

/// Get only object specified by ID from posts array.

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post && post.length) {
        return res.status(200).json(post);
      } else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

/// Add a new post object to posts array.

server.post("/api/posts", (req, res) => {
  // run checks
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  // do database mojo
  db.insert({ title, contents })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      })
    );
});

/// Delete an existing post object from posts array.

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
      if (post === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(`You successfully deleted ${post} item(s)`);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed." });
    });
});


/// Edit an existing post object within the posts array.

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (title && contents) {
    db.update(id, { title, contents }).then(post => {
      console.log(post);
      if (post === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(`You successfully updated ${post} item(s)`);
      }
    });
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
});

////
server.listen(9000, () => console.log("Server listening at port 9000"));
