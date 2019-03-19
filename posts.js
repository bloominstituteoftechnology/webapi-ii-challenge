var express = require('express')
var router = express.Router()
const db = require('./data/db')

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
router.post('/', (req, res) => {
  const { title, contents } = req.body
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  else {
    const date = new Date().toISOString()
    const post = {
      title: title,
      contents: contents,
      created_at: date,
      updated_at: date
    }
    db.insert(post)
      .then(post => {
        db.findById(post.id)
          .then(foundPost => {
            res.status(201).json(foundPost)
          })
          .catch(err => {
            res.status(500).json({ error: 'created, but could not find the post??' })
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
  }
})

router.get('/:id', (req, res) => {
  console.log('getting post', req.params.id)
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  db.remove(req.params.id)
    .then(d => {
      if (d === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
      res.status(200).json({ message: "delete successful"})
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ error: "The post could not be removed" })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  else {
    db.findById(id)
      .then(post => {
        if (post.length === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
          const date = new Date().toISOString()
          const postToUpdate = {
            title: title,
            contents: contents,
            created_at: post.created_at,
            updated_at: date
          }
          db.update(id, postToUpdate)
            .then(num => {
              db.findById(id)
                .then(foundPost => {
                  res.status(201).json(foundPost)
                })
                .catch(err => {
                  res.status(500).json({ error: 'updated, but could not find the post??' })
                })
            })
            .catch(err => {
              res.status(500).json({ error: "The post information could not be modified." })
            })
          }
      })
      .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
      })
  }
})

module.exports = router