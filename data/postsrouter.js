const express = require("express");
const router = express.Router();
const Posts = require("./db.js");

// Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  const blogPost = req.body;

  // If the request body is missing the title or contents property:
  if (!blogPost.title || !blogPost.contents) {
    res.status(400).json({
      errorMsg: "Please provide title and contents for the post."
    });

    // If the information about the post is valid:
  } else {
    Posts.insert(blogPost)
      .then(data => {
        res.status(201).json(data);
      })
      // If there's an error while saving the post:
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "There was an error while saving the post to the database."
        });
      });
  }
}); // CREATE data

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
  const commentInfo = {...req.body, post_id: req.params.id};
  const id = req.params.id;

// If the request body is missing the text property:
if(!commentInfo.text) {
  res.status(400).json({ errorMsg: "Please provide text for the comment"})

} else {
  Posts.findById(id)
    .then(post => {

   //If the information about the comment is valid:
      if (post.length > 0) {
        post.insertComment(commentInfo)
        .then(comment => {
          res.status(201).json(comment);
        })
   // If there's an error while saving the comment:
        .catch(err => {
          res.status(500).json({
            errorMsg: "There was an error while saving the comment to the database", err
          });
        });
// If the post with the specified id is not found:
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch( err => {
      res.status(500).json({
        errorMsg: "There was an error while saving the comment to the database", err
      });
    });
}

}); // CREATE data




// Returns an array of all the post objects contained in the
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    // If there's an error in retrieving the posts from the database:
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMsg: "The posts information could not be retrieved."
      });
    });
}); // READ data

// Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {

      if (posts) {
        res.status(200).json(posts);
// If the post with the specified id is not found:
      } else {
        res.status(404).json({
          Message: "The post with the specified ID does not exist."
        });
      }
    })
// If there's an error in retrieving the post from the database:
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Mesage: "The post information could not be retrieved."
      });
    });
}); // READ data

// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id);
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      // If the post with the specified id is not found:
      res.status(404).json({
        errorMsg: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMsg: "The comments information could not be retrieved."
    });
  }
}); // READ data

// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          Message: "The post has been nuked"
        });
   // If the post with the specified id is not found:
      } else {
        res.status(404).json({
          Message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Message: "The post could not be removed."
      });
    });
}); // DESTORYING data

// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/:id", (req, res) => {
  
  const changes = req.body;

  Posts.update(req.params.id, changes)
    .then(post => {
  // If the post is found and the new information is valid:
      if (post) {
        res.status(200).json(post);
  // If the post with the specified id is not found:
      } else {
        res.status(404).json({
          Message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Message: "The post information could not be modified."
      });
    });
}); // UPDATE data

module.exports = router;
