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
      const comment = await db.insertComment({ text: text, post_id: id });
      if (!comment) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(201).json(comment);
      }
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postsById = await db.findById(id);
    if (!postsById) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else {
      res.status(200).json(postsById);
    }
  } catch (err) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.findPostComments(id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      error: "The comments information could not be retrieved."
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.remove(id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!id || !title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const newPost = await db.update(id, req.body);
      if (!newPost) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(newPost);
      }
    } catch (err) {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    }
  }
});

module.exports = router;
