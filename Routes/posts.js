// Create express and router
const express = require('express');
const router = express.Router();

// Pull in dependencies
const db = require('../data/db');

// @route     POST api/posts
// @desc      Creates a post using the information sent inside the request body.
router.post('/', async (req, res) => {
  // Pull body from req
  const { body } = req;
  // Pull title and contents from the body
  const { title, contents } = body;
  // If the body doesn't have a title or contents, reject
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  try {
    // await result of inserting a post, which returns an id
    const info = await db.insert(body);
    // enter that id and return the post itself
    const post = await db.findById(info.id);
    // return status and post
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

// @route     POST api/posts/:id/comments
// @desc      Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', async (req, res) => {
  // ID from params
  const { id } = req.params;
  // body and text from body
  const { body } = req;
  const { text } = body;

  // if there is no text- reject
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  }

  try {
    // find post by ID
    const post = await db.findById(id);

    // If post is an empty array - reject
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }

    // add post id to the comment body
    const commentBody = { ...body, post_id: id };
    // add the comment body to the insert method
    const comment = await db.insertComment(commentBody);
    // using the comment id that is returned, fetch the comment
    const commentData = await db.findCommentById(comment.id);
    // display comment
    res.status(201).json(commentData);
  } catch (err) {
    // reject if any error
    console.log(err);
    res.status(500).json({
      error: 'There was an error while saving the comment to the database'
    });
  }
});

// @route     GET api/posts
// @desc      Returns an array of all the post objects contained in the database.
router.get('/', async (_, res) => {
  // find all posts
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

// @route     GET api/posts/:id
// @desc      Returns the post object with the specified id.
router.get('/:id', async (req, res) => {
    // pull ID from req.params
  const { id } = req.params;

  try {
      // find a post by id
    const post = await db.findById(id);

    // if post array is 0, reject
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }

    // if not, send post
    res.status(200).json(post);
  } catch (err) {
      console.log(err);
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

// @route     GET api/posts/:id/comments
// @desc      Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', async (req, res) => {
    // pull ID form req.params;
  const { id } = req.params;
  try {
      // find post by ID
    const post = await db.findById(id);

    // If post array length is 0, reject
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }

    // if not, using that post ID, we can fetch the comments
    const comments = await db.findPostComments(id);
    // if comments array length is 0, reject
    if (comments.length === 0) {
      res.status(404).json({ message: 'This post does not have any comments' });
    }

    // send the comments
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'The comments information could not be retrieved.' });
  }
});

// @route     DELETE api/posts/:id
// @desc      Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', async (req, res) => {
    // pull id from req.params
  const { id } = req.params;

  try {
      // find post using ID
    const post = await db.findById(id);
    // if post array length is 0, reject
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }

    // if not, remove the post using the id
    await db.remove(id);
    // send message noting it was successful
    res.status(200).send({ message: 'This post was deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

// @route     PUT api/posts/:id
// @desc      Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', async (req, res) => {
    // pull ID from req.params
  const { id } = req.params;
  // pull body from req, and title/contents from body
  const { body } = req;
  const { title, contents } = body;

  // if title and contents are not received, reject
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  try {
      // find the post by the id
    const post = await db.findById(id);
    // if array length is 0, reject
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }

    // update post by ID and what's in the body
    await db.update(id, body);
    // from there, we'll re-fetch the post
    const updatedPost = await db.findById(id);
    // we'll send the updated data
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'The post information could not be modified.' });
  }
});

module.exports = router;
