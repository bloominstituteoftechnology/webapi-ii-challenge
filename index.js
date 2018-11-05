// import your node modules

const db = require('./data/db.js')
const express = require('express')

// add your server code starting here

const server = express()
const port = 5000

server.get('/', (req, res) => {
  res.send('Hello from Express')
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).send('Could not locate posts'))
})

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(500).send('Could not locate post'))
})

server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
