// import your node modules
const express = require("express");
const server = express();
const db = require("./data/db.js");
const cors = require("cors");
const logger = require("morgan");

//middleware
server.use(express.json());
server.use(logger("dev"));
server.use(cors({ origin: "http://localhost:3000" }));

// add your server code starting here
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved.", error: err });
    });
});
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res, status(500).json({ error: "The post information could not be retrieved.", error: err });
    });
});

server.post("/api/posts", async (req, res) => {
  console.log("post", req.body);
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    const post = await db.findById(postId.id);
    res.status(201).json(post);
  } catch (error) {
    let message = "There was an error while saving the post to the database";

    if (error.errno === 19) {
      message = "please provide both the title and the contents";
    }
    res.status(500).json({ message: message, error });
  }
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} posts updated` });
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the post", err });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting post", err });
    });
});

server.listen(8000, () => console.log("\n== the server is alive! ==\n"));
