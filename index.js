// import your node modules

const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./data/db.js");

server.use(cors());

// middleware
server.use(express.json()); // teaches express how to parse the JSON request body

// add your server code starting here

// GET Request for all posts

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: err
      });
    });
});

// GET request for specific post

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(400)
          .json({ message: "The  post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved.",
        error: err
      });
    });
});

// POST

// server.post("/api/posts", async (req, res) => {
//   console.log("body", req.body);
//   try {
//     const postData = req.body;
//     const postId = await db.insert(postData);
//     const post = await db.findById(postId.id);
//     res.status(201).json(post);
//     console.log(req.body);
//   } catch (error) {
//     if (req.body.title === "" && req.body.contents === "") {
//       res.status(400).json({ message = "please provide info"});
//     }else{
//     res.status(500).json({ message: "error creating user", error });
//   }}
// });

server.post("/api/posts", (req, res) => {
  console.log("body", req.body);
  const postData = req.body;
  db.find(postData)
    .then(postId => {
      if (error.errno === 19) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post." });
      } else {
        res.status(201).json(postId);
        return db.insert(postData);
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error creatin post" });
    });
});

// Delete

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "The  post with the specified ID does not exist." });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The post could not be removed" });
    });
});

// PUT

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} post(s) updated` });
      } else {
        res
          .status(404)
          .json({ message: "The  post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "The post information could not be modified.",
          error: err
        });
    });
});

server.put("api/users/:id", (req, res) => {});

server.listen(3002, () => console.log("\n== Server Here ==\n"));
