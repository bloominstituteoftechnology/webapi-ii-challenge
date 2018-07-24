// import your node modules
const express = require("express");
const helmet = require("helmet");
const db = require("./data/db");
const server = express();

// add your server code starting here
server.use(helmet());
server.use(express.json());

server.post("/api/posts", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const post = await db.insert({ ...req.body });
      return res.status(201).json(post);
    } catch (err) {
      return res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  }
});

server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

server.get("/api/posts/:id", async (req, res) => {
  if (!db.findById(req.params.id)) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    try {
      const post = await db.findById(req.params.id);
      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    }
  }
});

server.listen(8000, () => console.log("API running..."));
