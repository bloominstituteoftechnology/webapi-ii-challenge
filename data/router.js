const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get('/:id', (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.post('/', (req, res) => {
  console.log(req.body);
  const {
    title,
    contents
  } = req.body;
  console.log(title, contents);
  if (title && contents) {
    try {
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

module.exports = router;