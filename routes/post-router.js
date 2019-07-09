const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const newPost = await db.insert(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  }
});

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    try {
      const post = await db.findById(id);
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        const comment = await db.insertComment(req.body);
        res.status(201).json(comment);
      }
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    }
  }
});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/comments", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

module.exports = router;
