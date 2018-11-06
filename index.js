// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");
const server = express();
// add your server code starting here
server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res
        .status(500)
        .send({error: "The posts information could not be retrieved."})
    );
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (!posts.length) {
        res
          .status(404)
          .send({message: "The post with the specified ID does not exist."});
      } else {
        return res.json(posts);
      }
    })
    .catch(err => res.send(err));
});

server.post("/api/posts", (req, res) => {
  console.log(req.body);
  db.insert(req.body)
    .then(post => {
      if (post) {
        // return the newly created post
        res.status(201).json(req.body);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({error: "The post could not be removed"});
    });
});

server.put("/api/posts/:id", async (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  const post = await db.findById(id);

  db.update(id, changes)
    .then(count => {
      if (!id) {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
      if (!changes.title || !changes.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        console.log(post);
        // return the updated pos
        // db.findById(id).then(post => {res.status(200).json(post)})
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({error: "The post information could not be modified."});
    });
});

server.listen(4000, () => console.log("Server is listening on port 4000"));
