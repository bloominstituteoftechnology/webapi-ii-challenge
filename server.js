const express = require('express')
const bodyParser = require('body-parser')
const server = express()

const db = require('./data/db.js')

server.use(bodyParser.json())

// 1. creates a post using the information sent inside the request body
server.post('/api/posts', (req, res) => {
  if (Object.keys(req.body)[0] !== 'title' || Object.keys(req.body)[1] !== 'contents') {
    const error = { "errorMessage": "Please provide title and contents for the post." }
    res.status(400).json(error)
  }

  db.insert(req.body)
    .then(id => { res.status(201).json(req.body) })
    .catch(e => {
      const error = { "error": "There was an error while saving the post to the database" }
      res.status(500).json(error)
    }) 
})

// 2. returns an array of all the post objects contained in the database
server.get('/api/posts', (req, res) => {
  db.find()
    .then(post =>  res.status(200).json(post))
    .catch(e => {
      const error = { "error": "The posts information could not be retrieved." }
      res.status(500).json(error)
    }) 
})

// 3. returns the post object with the specified id
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post =>  {
      if (post.length === 0) {
        const message = { "message": "The post with the specified ID does not exist." }
        res.status(404).json(message)
      }
      res.status(200).json(post)
    })
    .catch(e => {
      const error = { "error": "The post information could not be retrieved." }
      res.status(500).json(error)
    }) 
})

// 4. removes the post with the specified id and returns the deleted post
server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(post =>  {      
      if (post === 0) {
        const message = { "message": "The post with the specified ID does not exist." }
        res.status(404).json(message)
      }

      res.status(200).json(req.body)
    })
    .catch(e => {
      const error = { "error": "The post could not be removed" }
      res.status(500).json(error)
    }) 
})

// 5. updates the post with the specified id using data from the request body.
// returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
  if (Object.keys(req.body)[0] !== 'title' || Object.keys(req.body)[1] !== 'contents') {
    const error = { "errorMessage": "Please provide title and contents for the post." }
    res.status(400).json(error)
  }

  db.update(req.params.id, req.body)
    .then(post =>  { 
      if (post === 0) {
        const message = { "message": "The post with the specified ID does not exist." }
        res.status(404).json(message)
      }

      res.status(200).json(req.body)
    })
    .catch(e => {
      const error = { "error": "The post information could not be modified." }
      res.status(500).json(error)
    }) 
})

server.listen(8000, () => console.log('API is working'))