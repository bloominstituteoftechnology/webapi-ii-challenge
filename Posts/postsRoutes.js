const express = require('express');
const db = require('../data/db.js')

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      if (posts) {
        req.status(200).json(posts);
      } else {
        res.status(500).json({ error: 'The posts information could not be retrieved.' })
      }
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(400).json({ error: 'The post with the specified ID does not exist.' })
      }
    })
})

module.exports = router;