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
    .then(([comments]) => {
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

router.post('/:post_id/comments', (req, res) => {
  const { post_id } = req.params;
  const { text } = req.body;

  if (text === '' || typeof text !== 'string') {
    return res.status(400).json({ error: "Please provide text for the comment" })
  }

  db.insertComment({ text, post_id })
    .then(({ id: comment_id }) => {
      db.findCommentById(comment_id)
        .then(([comment]) => {
          if (comment) {
            res.status(200).json(comment)
          } else {
            res.status(404).json({ error: "The post witht he specified ID does not exist" })
          }
        })
        .catch(err => {

        })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})





router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body
  if (!title && !contents) {
    return res.status(400).json({ error: "Please provide title and contents for the post" })
  }
  db.update(id, { title, contents })
    .then(idUpdated => {
      if (idUpdated) {
        db.findById(id)
          .then(([post]) => {
            res.status(201).json(post)
          })
      } else {
        res.status(404).json({ error: "The post with the specified ID does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified" })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: "The post with the specified ID does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" })
    })
})

module.exports = router;