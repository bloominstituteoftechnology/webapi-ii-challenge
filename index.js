// import your node modules
const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.use(express.json());

// add your server code starting here
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
      post.length === 0
        ? res.status(404).json({ message: "The post with that ID doesn't exist."})
        : res.status(200).json(post[0]);
    })
    .catch(err => {
      res.status(500).json({ error: "The post cannot be found." })
    })
})

server.post('/api/posts', (req, res) => {
  const postInfo = req.body;
  console.log('post info', postInfo);

  db
    .insert(postInfo)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ msg: "Please provide all required fields" })
      } else {
        res.status(500).json({ error: err })
      }
    })
})

server.put('/api/posts/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Updated Successfully' })
      } else {
        res.status(404).json({ msg: 'Post not found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/api/posts', function(req, res) {
  const { id } = req.query;
  let post;
  db
    .findById(id)
    .then(foundPost => {
      post = { ...foundPost[0] };
  db
    .remove(id)
    .then(response => {
      res.status(200).json(post);
    })
  })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

server.listen(8000, () => {
  console.log('API Running on port 8000');
})