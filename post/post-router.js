const router = require("express").Router();
const Posts = require("../data/db.js");

//Get Requests
router.get("/", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then(post => {
      console.log(postId);
      if (post.length) {
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
        .json({ error: "The post information could not be retrieved. " });
    });
});

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(comments => {
      if (comments.length) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

//Post Request
router.post("/", (req, res) => {
  const postInfo = req.body;
  console.log(postInfo);
  if (!postInfo.title || !postInfo.contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post" });
  } else {
    Posts.insert(postInfo)
      .then(ids => {
        Posts.findById(ids.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error saving the post to the database."
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const commentInfo = req.body;
  const postId = req.params.id;

  if (!postId) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }
  if (commentInfo.text) {
    Posts.insertComment(commentInfo)
      .then(id => {
        Posts.findCommentById(id.id).then(comment => {
          res.status(201).json(comment);
        });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the comment to the database."
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  Posts.remove(postId)
    .then(post => {
      if (post) {
        res
          .status(200)
          .json({ message: "The post has been deleted successfully" });
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

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const changes = req.body;
//   Posts.findById(id).then(post => {
//     if (post.length) {
//       Posts.update(id, changes).then(updated => {
//         if (!changes.title || !changes.contents) {
//           res.status(400).json({
//             errorMessage: "Pleaese Provide title and contends for the post."
//           });
//         } else {
//           res.status(200).json(updated);
//         }
//       });
//     }
//   });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Please include an id with your request." });
  }
  Posts.findById(id).then(findPost => {
    if (findPost.length) {
      Posts.update(id, changes).then(updated => {
        Posts.findById(id)
          .then(post => {
            if (!post[0].title || !post[0].contents) {
              res.status(400).json({
                errorMessage: "Please provide title and contends for the post."
              });
            } else {
              res.status(200).json(post);
            }
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      });
    } else {
      res.status(400).json({ error: "The ID does not exist" });
    }
  });
});

module.exports = router;
