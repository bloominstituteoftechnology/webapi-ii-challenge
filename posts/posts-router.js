const express = require("express");

const router = express.Router();

const db = require("../data/db.js");

// handles URLS begining with /api/posts
router.post("/", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.body);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

module.exports = router;
