// import your node modules
const express = require('express');

const server = express();
const PORT = 4000;

const db = require('./data/db.js');

// GET without arguments
server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      res.status(200).json(posts);
    })
    .catch( err => {
      res.status(500).json({ error: "The posts information could not be retrieved."});
    })
});

// GET with id
server.get( '/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)

    // We have a result from db - send it out if it is valid
    .then( post => {
      //Check for an empty array
      if( post.length === 0 ){
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        res.status(200).json(post);
      }
      // res.status(200).json(posts);
    })
    // No valid response from db
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved."});
    })
});

// Listener:
server.listen( PORT, () => {
  console.log( `Server started on port: ${PORT}`)
});