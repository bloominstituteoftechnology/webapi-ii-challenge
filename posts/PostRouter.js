const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

router.get('/', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let post;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0] };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedPosts => {
          res.status(200).json(updatedPosts[0]);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;