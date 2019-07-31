const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await db.findById(id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved" });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const newPost = await db.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database."
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await db.remove(id);
    if (deletedPost) {
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ error: "The post could not be removed." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const updatedPost = await db.update(id, req.body);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;