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
  // text from body
  const { body } = req;
  const { text } = body;

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  }

  try {
    const post = await db.findById(id);
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else {
      const commentBody = { ...body, post_id: id };
      const comment = await db.insertComment(commentBody);
      const commentData = await db.findCommentById(comment.id);
      res.status(201).json(commentData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'There was an error while saving the comment to the database'
    });
  }
});

// @route     GET api/posts
// @desc      Returns an array of all the post objects contained in the database.

/**
 * When the client makes a GET request to /api/posts:

If there's an error in retrieving the posts from the database:
cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The posts information could not be retrieved." }.
 */
router.get('/', async (req, res) => {
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
router.get('/:id', (req, res) => {});

// @route     GET api/posts/:id/comments
// @desc      Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {});

// @route     DELETE api/posts/:id
// @desc      Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {});

// @route     PUT api/posts/:id
// @desc      Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {});

module.exports = router;
