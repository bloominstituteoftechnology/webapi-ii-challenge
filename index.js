const express = require("express");

const db = require("./data/db.js");
const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("Testing Server");
// });

// GET REQUEST
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});
// END GET

// START POST

let nextId = 10;
// let posts = [
//   {
//     id: nextId,
//     title: "The post title",
//     contents: "The post contents"
//   }
// ];

server.post("/api/posts", async (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    return res.status(422).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const response = await db.insert(post);
      res.status(201).json({ post });
    } catch {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    }
  }
});

//// delete request
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(8000, () => console.log("\n== API on port 8k === \n"));
