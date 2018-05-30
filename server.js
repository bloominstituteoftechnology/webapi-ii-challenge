// import your node modules
const express = require('express')
const db = require('./data/db.js')
const server = express()

server.use(express.json())

// middleware
const cors = require('cors')

const port = 5000
// add your server code starting here

server.get('/', (req, res) => {
  res.send('server is running...')
})

server.post('/api/posts', (req, res) => {
  const {
    title,
    contents
  } = req.body;
  db
    .insert({
      title,
      contents
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
})

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json({
        posts
      });
    })
    .catch(error => {
      res.json({
        error
      });
    });
});

server.listen(5000, () => console.log(`server is running on port ${port}`))