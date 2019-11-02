const express = require("express");
const Posts = require("./data/db");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findCommentById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;

  if (!postData.title || !postData.contents) {
    console.log("postdata.title:", postData.title);
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  console.log("postData: ", postData);
  Posts.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const comment = { ...req.body, post_id: req.params.id };
  console.log(comment.post_id);
  if (!comment.post_id) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!comment.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
  Posts.insertComment(comment)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
  Posts.remove(id)
    .then(post => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else if (!id) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
  Posts.update(id, post)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
