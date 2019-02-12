const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(post => res.status(200).json(post))
    .catch(() =>
      res
        .status(500)
        .json({ message: "The posts information could not be received." })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID was not found." });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "The post information could not be received." })
    );
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and content for the post." });
  }
  Posts.insert({ title, contents })
    .then(post => res.status(201).json(post))
    .catch(() =>
      res.status(500).json({
        message: "There was an error while saving the post to the database."
      })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The post was successfully deleted." });
      }
    })
    .catch(() =>
      res.status(500).json({ message: "The post could not be removed." })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  Posts.update(id, { title, contents })
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!title || !contents) {
        res.status(400).json({
          message: "Please provide title and contents for this post."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "The post information could not be modified." })
    );
});
module.exports = router;
