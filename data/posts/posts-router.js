const router = require('express').Router();

const Posts = require('../db.js');

// 1 - POST - Creates a post using the information sent inside the request body.
router.post("/", (req,res)=>{
   const post = req.body;

   if(!post.title || !post.contents) {
      res.status(400).json({ message: "The post with the specified ID does not exist." });
   }

   Posts.insert(post)
      .then((id)=>{
         res.status(201).json(post);
      })
      .catch((err)=>{
         res.status(500).json({ error: "There was an error while saving the post to the database" });
      });
});


// 2 - POST - Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req,res)=>{
   const comment = req.body;

   if(!commment.postID) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
   }

   if(!comment.text) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
   }

   Posts.insertComment(comment)
      .then((id)=>{
         res.status(201).json(comment);
      })
      .catch((err)=>{
         res.status(500).json({ error: "There was an error while saving the comment to the database" });
      });


});


// 3 - GET: Returns an array of all the post objects contained in the database.
router.get("/", (req,res)=>{

   Posts.find()
      .then((postsList)=>{
         res.status(201).json(postsList);
      })
      .catch((err)=>{
         res.status(500).json({ error: "The posts information could not be retrieved." });
      });

});


// 4 - GET - /api/posts/:id - Returns the post object with the specified id.   
router.get("/:id", (req,res)=>{
   const id = req.params.id;

   Posts.findById(id)
      .then((post)=>{
         if (post == []) { return res.status(404).json({ message: "The post with the specified ID does not exist." }); }
         else { res.status(201).json(post); }
      })
      .catch((err)=>{
         res.status(500).json({ error: "The post information could not be retrieved." });
      });

});


// 5 - GET - /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req,res)=>{
   const id = req.params.id;

   Posts.findPostComments(id)
      .then((comments)=>{
         if (comments == []) { return res.status(404).json({ message: "The post with the specified ID does not exist." }); }
         else { res.status(201).json(comments); }
      })
      .catch((err)=>{
         res.status(500).json({ message: "The post with the specified ID does not exist." });
      });

});   


// 6 - DELETE - Removes the post with the specified id and returns the deleted post object. You may 
//              need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req,res)=>{
   const id = req.params.id;
   console.log("delete id:", req.params.id);

   Posts.findById(id)
      .then((returnValue)=>{
         if (returnValue == []) { return res.status(404).json({ message: "The post with the specified ID does not exist." })}
      })
      .catch((err)=>{
         //
      })


   Posts.remove(id)
      .then((postsList)=>{
         res.status(201).json(postsList);    /// whats the right status code for successful delete?
      })
      .catch((err)=>{
         res.status(500).json({ error: "The post could not be removed" });
      });
});


// 7 - PUT - /api/posts/:id - Updates the post with the specified id using data from the request body. 
//                            Returns the modified document, NOT the original.   !!! test
router.put("/:id", (req,res)=>{
   const id = req.params.id;

   const post = req.body;

   if(!post.title) {
      res.status(404).json({ errorMessage: "Please provide title and contents for the post." });
   }
   if(!post.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
   }

   Posts.findById(id)
      .then((returnValue)=>{
         if (returnValue == []) { return res.status(404).json({ message: "The post with the specified ID does not exist." })}
      })
      .catch((err)=>{
         //
      })


   Posts.update(id, post)
      .then((post)=>{
         res.status(201).json(post);    /// whats the right status code for successful delete?
      })
      .catch((err)=>{
         res.status(500).json({ error: "The post information could not be modified." });
      });
});

module.exports = router;
