const express = require('express');
const db = require('../data/db.js')

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      res.status(500).json({ error: "The Post information could not be retrieved" })
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(([posts]) => {
      if (posts) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exsist" })
      }
    })
});

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({ error: 'The comments information could not be retrieved.' })
      }
    })
})

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ error: "Please provide title and contents for the post" })
  }
  db.insert({ title, contents })
    .then(({ id }) => {
      db.findById(id)
        .then(([post]) => {
          res.status(201).json(post)
        })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

module.exports = router;