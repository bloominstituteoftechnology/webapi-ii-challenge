const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./data/db.js');
const server = express();

server.use(bodyParser.json()); // middleware ... server.us(express.json())
server.use(cors());

server.get('/', (req, res) => { res.send("your api is running") })

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err => req.status(500).json({ error: "The posts information could not be retrieved." }) )
})

server.get('/api/posts/:id', (request, response) => {
  const { id } = request.params;
  db.findById(id)
    .then(post => {
      post.length === 0 ? 
        response.status(404).json({ error: "The post with the specified ID does not exist." }) :
        response.json(post[0])
    })
    .catch(error => response.status(500).json({ error: "The post information could not be retrieved." }))
})

server.post('/api/posts', (request, response) => {
  const { title, contents } = request.body;
  const newPost = { title, contents };
  !title || !contents ? 
    response.status(400).json({ error: "Please provide title and contents for the post." }) :
    db.insert(newPost)
      .then(post => { response.status(201).json(post) }) // returns id within object
      .catch(error => { response.status(500).json({ error: "There was an error while saving the post to the database." }) })
})

server.delete('/api/posts/:id', (request, response) => {
  const { id } = request.params; // const { id } = request.query;
  !db.findById(id) ? 
    response.status(404).json({ message: "The post with the specified ID does not exist." }) :
    db.remove(id)
      .then(posts => { db.find().then(posts => response.json(posts)) })
      .catch(err => { response.status(500).json({ error: "The post could not be removed." }) })
})

server.put('/api/posts/:id', (request, response) => {
  const { id } = request.params; // const { id } = request.query;
  const { title, contents } = request.body;
  !db.findById(id) ? 
    response.status(404).json({ message: "The post with the specified ID does not exist." }) :
    !title || !contents ?
      response.status(400).json({ errorMessage: "Please provide title and contents for the post." }) :
      db.update(id, { title, contents })
        .then(updated => { db.find().then(posts => response.json(posts)) })
        .catch(err => response.status(500).json({ error: "The post information could not be modified." }))
})

server.listen(5000);