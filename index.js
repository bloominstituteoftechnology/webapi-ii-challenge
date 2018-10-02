// import your node modules
const db = require("./data/db.js");
const express = require("express");
const cors = require("cors");

// creates an server express application using the express module
const server = express();
server.use(cors());
// server.use(express.json());

// GET //
server.get("/api/posts", (req, res) => {
  db.find()
		.then(posts => res.json(posts))
    .catch(err => res.send(err));
});

server.get("api/posts/:id", (req, res) => {
  db.findById(parseInt(req.params.id))
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
          res.status(500).json({ error: "Post could not be found" });
      });
});
//////////

// POST //
server.post("/api/posts", (req, res) => {
  const {postTitle, postContent} = req.body;

    if(!postTitle || !postContent) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    const newPost = {postTitle, postContent};
    db.insert(newPost)
        .then(post => {
                res.status(201).json(post);
        })
        .catch(() => res.status(500).json({error: "There was an error while saving the post to the database"}))
});
//////////

// DELETE //
server.delete("/api/posts:id", (req, res) => {
  const {id} = req.params;
  if(!id) {
      res.status(404).json({message: "The post with the specified ID does not exist"});
  }
  db.remove(id)
      .then(deletedPost => {
          res.status(200).json(deletedPost);
      })
      .catch(() => res.status(500).json({error: "The post could not be removed."}))
});
//////////

// PUT //
server.put("/api/posts", (req, res) => {
  const {id} = req.params;
  if(!id) {
      res.status(404).json({message: "The post with the specified ID does not exist"});
  }
  const {title, contents} = req.body;
  if(!title || !contents) {
      res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }

  const updatedPost = {title, contents};
  db.update(id, updatedPost)
      .then(post => {
          res.status(200).json(post);
      })
      .catch(() => res.status(500).json({error: "The post information could not be modified."}));
      
});
//////////

// **Port Listening** //
const port = 5000;
server.listen(port, () =>
  console.log(`Server is listening on Port ${port}`)
);
//////////