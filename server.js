// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.post('/api/posts', (req, res) => {
  console.log(req.body);
  if (!('title' in req.body) || !('contents' in req.body)) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  db.insert(req.body).then(response => {
    db.findById(response.id).then(response => res.status(201).json(response)).catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
  }).catch(err => {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  });
});

server.get('/api/posts', (req, res) => {
  db.find().then(response => {
    res.json(response);
  }).catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id).then(response => {
    res.json(response);
  }).catch(err => {
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id).then(response => {
    res.json(response);
  }).catch(err => {
    res.status(500).json({ error: err });
  });
});

server.put('/api/posts/:id', (req, res) => {
  db.update(req.params.id, req.body).then(response => {
    res.json(response);
  }).catch(err => {
    res.status(500).json({ error: err });
  });
});

server.listen(3000);