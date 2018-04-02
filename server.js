// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

const post = {
  title: "The post title",
  contents: "The post contents"
}

server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  });
});

server.post('/api/posts', (req, res) => {
  db.insert(post)
  .then(post => res.json(post))
  .catch(error => {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.findById(id)
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.remove(id)
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  });
});

server.put('api/posts/:id', (req, res) => {
  const { id } = req.params;
  const newPost; 
  db.update(id)
  .then(posts => res.json(posts))
  .catch()
});


const port = 5000;
server.listen(port, () => console.log('server running on port 5000'));