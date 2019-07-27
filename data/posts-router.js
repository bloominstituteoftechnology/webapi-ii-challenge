const express = require('express');
const Posts = require('./db.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the posts.' });
  }
});

router.post('/', async (req, res) => {
  const post = { ...req.body };
  try {
    const newPost = await Posts.insert(req.body);
    if (newPost.title && newPost.contents) {
      console.log(req.body, newPost);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        success: false,
        message: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'There was an error while saving the post to the database'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'The post information could not be retrieved.' });
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Posts.findCommentById(req.params.id);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'The comments information could not be retrieved.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Posts.remove(req.params.id);
    if (deleted) {
      res
        .status(200)
        .json({ deleted, message: 'The post has been destroyed!' })
        .end();
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'The post could not be removed' });
  }
});

router.put('/:id', async (req, res) => {
  const updatedPost = { ...req.body, post_id: req.params.id };
  try {
    const post = await Posts.update(updatedPost);
    if (post) {
      res.status(200).json(post);
    } else {
      if (!updatedPost.title || !updatedPost.contents) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'The post information could not be modified.'
    });
  }
});

module.exports = router;
