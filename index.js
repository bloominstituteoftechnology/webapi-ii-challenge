// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const result = await db.find();

    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

server.get("/api/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await db.findById(id);

    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

server.post("/api/posts", async (req, res) => {
  const userInfo = req.body;

  try {
    const result = await db.insert(userInfo);

    if (!userInfo.title || !userInfo.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(201).json(userInfo);
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

server.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await db.findById(id);

    if (post.length) {
      await db.remove(id);
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

server.put("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  const updatedObject = req.body;

  try {
    const post = await db.findById(id);

    if (!post.length) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      await db.update(id, updatedObject);

      if (!updatedObject.title || !updatedObject.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(200).json(updatedObject);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

server.listen(5005);
