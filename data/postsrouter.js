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


// 	Returns the post object with the specified id.
//code here.



//Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  Posts.add(req.body)
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


// 	Creates a comment for the post with the specified id using information sent inside of the request body.
//code here.



// Returns an array of all the comment objects associated with the post with the specified id.
//code here.


// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
//code here.


// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
//code here.



module.exports = router; 