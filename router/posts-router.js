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

module.exports = router;
