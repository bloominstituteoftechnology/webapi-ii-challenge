const express = require('express')

const db = require('../data/db.js')

const router = express.Router();

//Get posts
router.get("/", (req, res) => {
    db.find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500).json({ error: "The post information could not be retrieved" });
      });
  });
  
  router.get("/:id", (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
      .then(post => {
        console.log(postId);
        if (post) {
          res.status(200).json(post);
        } else {
          res
            .status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res
          .status(500).json({ error: "The post information could not be retrieved. " });
      });
  });
  
  router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    db.findPostComments(postId)
      .then(comments => {
        if (comments) {
          res.status(200).json(comments);
        } else {
          res
            .status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(500).json({ message: "The comments information could not be found" });
      });
  });
  
  //Post Request
  router.post("/", (req, res) => {
    const postInfo = req.body;
    console.log(postInfo);
    if (!postInfo.title || !postInfo.contents) {
      return res
        .status(400).json({ error: "Please provide title and contents" });
    } else {
      db.insert(postInfo)
        .then(ids => {
          db.findById(ids.id).then(post => {
            res.status(201).json(post);
          });
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error saving the post."});
        });
    }
  });
  
  router.post("/:id/comments", (req, res) => {
    const commentInfo = req.body;
    const postId = req.params.id;
  
    if (!postId) {
      return res
        .status(404).json({ message: "The post with this ID does not exist" });
    }
    if (commentInfo.text) {
      db.insertComment(commentInfo)
        .then(id => {
          db.findCommentById(id.id).then(comment => {
            res.status(201).json(comment);
          });
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "There was an error while saving this comment." });
        });
    }
  });
  
  router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    db.remove(postId)
      .then(post => {
        if (post) {
          res
            .status(200)
            .json({ message: "The post has been deleted" });
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  });
  
  router.put("/:id", (req, res) => {
    const { d } = req.params;
    console.log(d);
    const changes = req.body;
    db.findById(d).then(post => {
      if (post.length) {
        db.update(d, changes).then(updated => {
          if (!changes.title || !changes.contents) {
            res.status(400).json({
              errorMessage: "Pleaese Provide title and contends for the post."
            });
          } else {
            res.status(200).json(updated);
          }
        });
      }
    });
  });
  
  module.exports = router;

