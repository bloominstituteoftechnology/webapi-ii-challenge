// import your node modules
const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.use(express.json());

// add your server code starting here
server.post('/api/posts', (req, res) => {
  const newPost = req.body;

  db
    .insert(newPost)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get('/', (req, res) => {
  res.send('<a href="localhost:8000/api/posts">All Posts</a><br/><a href="localhost:8000/api/posts/1">Post by id<a/>')
})

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json(posts)       
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The posts cannot be found.",
        error: err })
    })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params; 
  console.log('id:', id); 

  db
    .findById(id)
    .then(post => {
      !(post.length) 
        ? res.status(404).json({ message: "The post with that ID doesn't exist."})
        : res.status(200).json(post[0]);
    })
    .catch(err => {
      res.status(500).json({ error: "The post cannot be found." })
    })
})

server.listen(8000, () => {
  console.log('API Running on port 8000');
})