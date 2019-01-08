// import your node modules
const express = require("express");
var cors = require("cors");
const db = require("./data/db.js");

const port = 5000;
// add your server code starting here
const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Welcome to the League of Shadows</h1>");
});

// GET - READ
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET - Read with specific ID
server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

// POST - CREATE
server.post("/api/posts", (req, res) => {
  const post = req.body;
  console.log(req.body);

  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  } else {
    db.insert(post)
      .then(result => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch(err =>
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database"
          })
      );
  }
});



// DELETE
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
  .then(post => {
    if (post) {
      db.remove(id).then(count => {
        res.status(200).json(post);
      })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})


// PUT - UPDATE
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.findById(id).then(post => {
    if (!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } 
    if (!changes.title || !changes.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(id, changes).then(result => {
      res.status(200).json({result})
    })
  })
  .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
})





server.listen(port, () => console.log(`Port: ${port}`));
