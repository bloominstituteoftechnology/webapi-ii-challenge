const express = require('express');
const Posts = require('./db');
const Comments = require('./db');

const router = express.Router();


//POST
router.post('/', async (req, res) => {
    try {
        const {title, contents} = req.body
        const post = await Posts.insert(req.body);
      if (title && contents) {
      res.status(201).json(post);
      } else if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({error: "There was an error while saving the post to the database"});
    }
  });
//POST
  
router.post('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.insertComment({post_id:req.params.id, text:req.body.text});
        if (comments) {
            res.status(201).json(comments);
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          }
        } catch (error) {
          // log error to database
          console.log(error);
          res.status(500).json({error: "The post information could not be retrieved."});
        }
})

  //GET
  router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find(req.query);
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved."});
    }
  });

  //GET id
  router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({error: "The post information could not be retrieved."});
    }
  });

  //GET comments by id
  router.get('/:id/comments', async(req, res) => {
    try {
      const comments = await Comments.findPostComments(req.params.id)
      if (comments.length > 0) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
      }
    } catch(error) {
      console.log(error)
      res.status(500).json({error: "The comments information could not be retrieved."});
    }
  })

  //DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const count = await Posts.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The post has been removed' });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."  });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({error: "The post could not be removed" });
    }
  });
  
//PUT/UPDATE
  router.put('/:id', async (req, res) => {
    try {
        const {title, contents} = req.body
        const post = await Posts.update(req.params.id, req.body);
      if (post) {
      res.status(201).json(post);
      } else if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post." })
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({error: "There was an error while saving the post to the database"});
    }
  });
 

module.exports = router;