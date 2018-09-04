// QUESTION: HOW TO HAVE .CATCH ERRORS FOR DIFFERENT TYPES.

// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id) // to access ids, refer react router stuff.
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })

          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be retrieved." });
          });
      }
    });
});

server.post("/posts", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    try {
      const response = db.insert(post);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  db.update(id, post).then(count => {
    if (!count) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (post.title && post.contents) {
      try {
        db.update(id, post);
        res.status(200).json(post);
      } catch (err) {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  });
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
