// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
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

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
  const userInfo = req.body; // reads information from the body of the request

  db.insert(userInfo)
    .then(response => {
      if (!userInfo.title || !userInfo.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(201).json(userInfo);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      if (user.length) {
        db.remove(id).then(count => {
          res.status(200).json(user);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const updatedObject = req.body;

  db.findById(id)
    .then(post => {
      if (!post.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.update(id, updatedObject).then(count => {
          if (!updatedObject.title || !updatedObject.contents) {
            res.status(400).json({
              errorMessage: "Please provide title and contents for the post."
            });
          } else {
            res.status(200).json(updatedObject);
          }
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

server.listen(5005);
