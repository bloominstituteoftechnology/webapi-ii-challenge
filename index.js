// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.get('api/posts', (req, res) => {
  db.find().then( posts => {
    res.json(posts);
  }).catch( error => {
    res.stats(500).json({error: "The posts information could not be retrieved."})
  })
})

server.get('/api/post/:id', (req, res) => {

})

server.listen(8000)