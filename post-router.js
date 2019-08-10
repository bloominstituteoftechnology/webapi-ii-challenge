const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  //datatype
  //status code
  //responce
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json({
      message: 'Error retrieving posts'
    })
  }
})

module.exports = router;
