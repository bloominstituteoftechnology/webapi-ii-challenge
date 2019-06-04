const express = require('express');
const Posts = require('./db');
const Comments = require('./db');

const router = express.Router();

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


module.exports = router;