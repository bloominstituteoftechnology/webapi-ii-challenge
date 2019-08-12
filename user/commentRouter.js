const express = require("express");
const DB = require("../data/db.js");
const router = express.Router();

///:id/comments

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
console.log(id)
  if (!id) {
    DB.findCommentById(id).then(userId =>
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    );
  } else {
    DB.findCommentById(id)
      .then(userId => res.status(200).json(userId))
      .catch(err =>
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." })
      );
  }
});


router.post("/:id/comments", (req, res) => {
  const blogBody = req.body;
  const { text } = req.body;
  if (text) {
    DB.insertComment(blogBody)
      .then(blogs => {
        console.log(blogs);
        res.status(201).json(blogs);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide text for the comments."
    });
  }
});











module.exports = router;
