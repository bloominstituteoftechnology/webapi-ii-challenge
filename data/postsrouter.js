const express = require('express');
const router = express.Router(); 
const Posts = require('./db.js');



// Returns an array of all the post objects contained in the 
router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    })
  })
}); // READ data


// Returns the post object with the specified id.
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(posts => {
    if(posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({
        Message: "Post not found"
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      Mesage: "Error retrieving the posts"
    })
  })
}); // READ data


// Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Posts.findPostComments
    (req.params.id);
    if (comments.length > 0) {
      res.status(200).json(comments);

    } else {
      res.status(404).json({
        Comments: "No comments for this post"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error retrieving comments for this post"
    })
  }
}); // READ data



// Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  Posts.insert(req.body)
  .then(data => {
    res.status(201).json(data);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error adding the data"
    });
  });

});  // CREATE data


// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', async (req, res) => {
    const commentInfo = {...req.body, post_id: 
    req.params.id }

    try {
      const comment = await Posts.insertComment(commentInfo);
      res.status(201).json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        err
      });
    }
});  // CREATE data



// Returns an array of all the comment objects associated with the post with the specified id.
//code here.


// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
//code here.


// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
//code here.



module.exports = router; 