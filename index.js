// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.get('api/posts', (req, res) => {
  db.find().then( posts => {
    res.status(200).json(posts);
  }).catch( error => {
    res.status(500).json({error: "The posts information could not be retrieved.", error: error})
  })
})

server.get('/api/post/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
      }
    })
    .catch( error => {
      res.status(500).json({})
    })
})

server.listen(8000)