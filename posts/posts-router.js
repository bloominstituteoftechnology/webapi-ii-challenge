const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
     db.find()
    .then(allPosts => {
      res.status(200).json(allPosts);
    }).catch(err => {
      res.status(500).send(err);
    })
})

  router.get('/:id', (req, res) => {
      const { id } = req.params;

       db.findById(id)
      .then(userId => {
        res.status(200).json(userId);
      })
      .catch(err => {
        res.status(500).send(err);
      })
})


router.post('/', (req, res) => {
    const newPost = req.body

     db.insert(newPost)
    .then(addedPost => {
      res.status(201).json(addedPost)
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

     db.update(id, changes)
    .then(updatedInfo => {
      if (updatedInfo) {
        res.json(updatedInfo);
      } else {
        res.status(404).json({ err: 'incorrect id'})
      }
    })
    .catch(err => {
      res.status(404).send(err);
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

     db.remove(id)
    .then(removedPost => {
      res.json(removedPost);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

module.exports = router;
