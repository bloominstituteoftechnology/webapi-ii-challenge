const express = require('express')
const router = express.Router()

const db = require('../data/db')



// POST  
router.post('/', (req, res) => {
  const { title, contents } = req.body
  //console.log(req.body)

  if(!title || !contents) {
    res.status(400)
    .json({ error: "Please provide title and contents for the post."})
  } else {
    db.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(() => {
      res.status(500).json({
         error: "There was an error while saving the post to the database"
      })
    })
  }
})


//POST MESSAGE // implement messaging

//insertComment(): calling insertComment while passing it a comment object will add it to the database and return an object with the id of the inserted comment. 
//The object looks like this: { id: 123 }. This method will throw an error if the post_id field in the comment object does not match a valid post id in the database.
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    // Because findById returns an array by default we want to destructure the
    // first element to check if it is defined. An empty array in JS is
    // technically truthy, but if it's an empty array array[0] will equal
    // undefined.
    const [post] = await db.findById(id);

    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
      return;
    }

    if (!text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment"
      });
      return;
    }

    const { id: commentId } = await db.insertComment({
      post_id: id,
      text
    });

    const [comment] = await db.findCommentById(commentId);

    if (!comment) {
      res.status(404).json({
        message: "The comment with the specified ID does not exist."
      });
      return;
    }

    res.status(201).json({
      comment
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});




// router.post('/:id/comments', (req, res) => {
//   //const commentInfo = {...req.body, post_id: req.params.id }
//     const { text, post_id } = req.body
//     // post_id: Integer, required, must match the id of a post entry in the database
 
//       if(!text) {
//         res.status(400).json({
//           message: "Please provide text for the comment." 
//         })
//        }
//       else {
//         db.insertComment(req.body)
//         .then(id => {
//           console.log(id.id)

//             db.findCommentById(id.id)
//             .then(comment => {
//               if(comment.length > 0) {
//                 //console.log(comment)
//                 res.status(200).json(comment)
//               } else {
//                 res.status(404)
//                 .json({ message: "The post with the specified ID does not exist." })
//               }
//             })

//         })
//          .catch(() => {
//            res.status(500).json({
//              message: "There was an error while saving the comment to the database"
//           })
//         })
//       }
//    })



// GET 

//find(): calling find returns a promise that resolves to an array of all the posts contained in the database.

router.get('/', (req, res) => {
  db.find()
  .then(allPosts => {
    res.status(200).json(allPosts)
  })
  .catch(() => {
    res.status(500).json({
      error: "The posts information could not be retrieved." 
  })
 })
})


//GET POSTS by ID  

//findById(): this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
  .then(post => {
    console.log(post)
    if(post.length > 0) {
      res.status(200).json(post)
    } else {
      res.status(404)
      .json({ message: 'The post with the specified ID does not exist.'})
    }
  })
  .catch(() => {
    res.status(500)
    .json({ error: 'The post information could not be retrieved.'})
  })
})



// GET POST COMMENTS BY POST ID

// Returns an array of all the comment objects associated with the post with the specified id.
//findCommentsById(): accepts an id and returns the comment associated with that id.
//findPostComments(): the findPostComments accepts a postId as its first parameter and returns all comments on the post associated with the post id.
router.get('/:id/comments', (req, res) => {
  const postId = req.params.id
  db.findPostComments(postId)
  .then(comment => {
    if(comment.length > 0) {
      console.log(comment)
      res.status(200).json(comment)
    } else {
      res.status(404)
      .json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(() => {
    res.status(500)
    .json({ error: "The comments information could not be retrieved." })
  })
})


//DELETE 

//Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

//remove(): the remove method accepts an id as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
router.delete('/:id', (req, res) => {
  //const { id } = req.params;
  const id = req.params.id
 
  db.remove(id)
  .then(deletedPost => {
     if(deletedPost) {
       res.json(deletedPost)
     } else {
       res.status(404).json({
          message: "The post with the specified ID does not exist." 
       })
     }
    })
    .catch(() => {
      res.status(500).json({error: "The user could not be removed."})
    })
  })



  // PUT 
  
  //Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

  //update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.

  router.put('/:id', (req, res) => {
    const { title, contents } = req.body

    if(!title || !contents) {
      res.status(400)
      .json({ message: "Please provide title and contents for the post." })
    } else {
       db.update(req.params.id, req.body)
       .then(post => {
          if(post) {
            res.status(200).json(post)
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist." 
            })
          }
       })
       .catch(() => {
          res.status(500).json({
            error: "The post information could not be modified." 
          })
       })
     }
  })



module.exports = router


///////////////////////////////////////////////////////////
//SOLUTION USING ASYNC/AWAIT
// const router = require("express").Router();

// const db = require("../data/db");

// router.post("/", async (req, res) => {
//   const { title, contents } = req.body;

//   if (!title || !contents) {
//     res.status(400).json({
//       errorMessage: "Please provide title and contents for the post."
//     });
//     return;
//   }

//   try {
//     const { id } = await db.insert({ title, contents });

//     const [post] = await db.findById(id);

//     if (!post) {
//       res.send(404).json({
//         errorMessage: "No post found with that ID"
//       });
//       return;
//     }

//     res.status(201).json({
//       post: post
//     });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).json({
//       error: "There was an error while saving the post to the database"
//     });
//   }
// });

// router.post("/:id/comments", async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;

//   try {
//     // Because findById returns an array by default we want to destructure the
//     // first element to check if it is defined. An empty array in JS is
//     // technically truthy, but if it's an empty array array[0] will equal
//     // undefined.
//     const [post] = await db.findById(id);

//     if (!post) {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//       return;
//     }

//     if (!text) {
//       res.status(400).json({
//         errorMessage: "Please provide text for the comment"
//       });
//       return;
//     }

//     const { id: commentId } = await db.insertComment({
//       post_id: id,
//       text
//     });

//     const [comment] = await db.findCommentById(commentId);

//     if (!comment) {
//       res.status(404).json({
//         message: "The comment with the specified ID does not exist."
//       });
//       return;
//     }

//     res.status(201).json({
//       comment
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "There was an error while saving the comment to the database"
//     });
//   }
// });

// router.get("/", async (_req, res) => {
//   try {
//     const posts = await db.find();

//     res.status(200).json({
//       posts
//     });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).json({
//       error: "The posts information could not be retrieved."
//     });
//   }

//   res.send("Hello There");
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [post] = await db.findById(id);

//     if (!post) {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//       return;
//     }

//     res.status(200).json({
//       post
//     });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).json({
//       error: "The post information could not be retrieved."
//     });
//   }
// });

// router.get("/:id/comments", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [post] = await db.findById(id);

//     if (!post) {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//       return;
//     }

//     const comments = await db.findPostComments(id);

//     res.status(200).json({
//       comments
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       error: "The comments information could not be found"
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [post] = await db.findById(id);

//     if (!post) {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//       return;
//     }

//     await db.remove(id);

//     res.status(200).json({
//       post
//     });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).json({
//       error: "The post could not be removed"
//     });
//   }
// });

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, contents } = req.body;

//   try {
//     if (!title || !contents) {
//       res.status(400).json({
//         errorMessage: "Please provide title and contents for the post."
//       });
//       return;
//     }

//     const updatedCount = await db.update(id, { title, contents });

//     if (updatedCount === 0) {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//       return;
//     }

//     const [updatedPost] = await db.findById(id);

//     res.status(200).json({
//       post: updatedPost
//     });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).json({
//       error: "The post information could not be modified."
//     });
//   }
// });

// module.exports = router;