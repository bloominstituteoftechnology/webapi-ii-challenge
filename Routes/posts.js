const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Testing');
});

// @route     POST api/posts
// @desc      Creates a post using the information sent inside the request body.
router.POST('/', (req, res) => {});

// @route     POST api/posts/:id/comments
// @desc      Creates a comment for the post with the specified id using information sent inside of the request body.
router.POST('/:id/comments', (req, res) => {});

// @route     GET api/posts
// @desc      Returns an array of all the post objects contained in the database.
router.GET('/', (req, res) => {});

// @route     GET api/posts/:id
// @desc      Returns the post object with the specified id.
router.GET('/:id', (req, res) => {});

// @route     GET api/posts/:id/comments
// @desc      Returns an array of all the comment objects associated with the post with the specified id.
router.GET('/:id/comments', (req, res) => {});

// @route     DELETE api/posts/:id
// @desc      Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.DELETE('/:id', (req, res) => {});

// @route     PUT api/posts/:id
// @desc      Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.PUT('/:id', (req, res) => {});

module.exports = router;
