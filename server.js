// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
  db.find()
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    console.log(error.message)
  })
})

server.get('/api/posts/:id', (req, res) => {
  db.findById(req)
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    console.log(error.message)
  })
})

server.post('/api/posts', (req, res) => {
  db.insert(req)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    console.log(error.message)
  })
})

server.put('/api/posts/:id', (req, res) => {
  db.update(req)
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    console.log(error.message)
  })
})

server.delete('/api/posts', (req, res) => {
  db.remove(req)
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    console.log(error.message)
  })
})


server.listen(8000, () => console.log('API Running...'));
