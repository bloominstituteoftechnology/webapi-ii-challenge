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

module.exports = router;
