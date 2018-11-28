// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

const PORT = 5000;

// add your server code starting here

//grabbing a list of all posts
server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      res.json(posts)
    })
    .catch( err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved."})
    })
})

//grabbing an individual post by id
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then( post => {
      if (post.length !== 0) {
        res.json(post)
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch( err => {
      res.json({message: 'unable to load posts'})
    })
})

//listening
server.listen(PORT, () => {
  console.log(`my server is running on port ${PORT}`)
})