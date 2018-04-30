// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.post('/api/posts', (req, res) => {
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
  db.findById(req.params.id).then(x => {
    db.remove(req.params.id).then(response => {
      res.json(response);
    }).catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
  }).catch(err => {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  })
});

server.put('/api/posts/:id', (req, res) => {
  if (!('title' in req.body) || !('contents' in req.body)) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  db.findById(req.params.id).then(x => {
    db.update(req.params.id, req.body).then(response => {
      res.json(response);
    }).catch(err => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
  }).catch(err => {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  })
});

server.listen(3000);