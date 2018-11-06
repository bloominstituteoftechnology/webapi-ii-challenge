// import modules
const db = require('./data/db.js')
const express = require('express')

// start and configure server
const server = express()
const port = 5000

server.use(express.json())

// configure routes

// root
server.get('/', (req, res) => {
  res.send('Server is live')
})

// get all posts
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res.status(500).json({ message: 'Could not locate posts', error: err })
    )
})

// get specific post
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'Could not locate post' })
      }
    })
    .catch(err =>
      res.status(500).json({ message: 'Could not locate post', error: err })
    )
})

// post to db
server.post('/api/posts', async (req, res) => {
  try {
    const newPost = await db.insert(req.body)
    const user = await db.findById(newPost.id)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    })
  }
})

// update in db
server.put('/api/posts/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'user updated' })
      } else {
        res.status(404).json({ message: 'user not found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'error updating db ' }))
})

// delete from db
server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'error deleting post' }))
})

// set up listener
server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
