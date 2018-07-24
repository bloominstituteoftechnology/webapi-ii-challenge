const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Home page');
})

server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.insert(req.body)
    .then(post => res.status(201).json(post))
    .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }));
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(201).json(posts))
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }));
})

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length === 0) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => res.status(500).json({ error: "The post information could not be retrieved." }));
})

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      if (post.length === 0) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => res.status(500).json({ error: "The post could not be removed" }));
})

server.put('/api/posts/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.update(req.params.id, req.body)
    .then(post => {
      if (post.length === 0) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => res.status(500).json({ error: "The post information could not be modified." }));
})

server.listen(8000, () => console.log("API running"));
