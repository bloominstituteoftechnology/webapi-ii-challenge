// import your node modules
const express = require("express");
const helmet = require("helmet");
const db = require("./data/db");
const server = express();

// add your server code starting here
server.use(helmet());
server.use(express.json());

server.post("/api/posts", (req, res) => {
  db.insert();
});

server.post("/api/posts", async (req, res) => {
  if (req.body.title == null || req.body.contents == null) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    const post = await db.insert({ ...req.body });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

server.listen(8000, () => console.log("API running..."));
