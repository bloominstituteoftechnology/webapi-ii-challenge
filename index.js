// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj

server.get('/', (req, res) => {
  // request/route handler
  res.send('This is a GET TEST');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.status(500).send({ error: "The posts information could not be retrieved." }));

});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.json(post)
      } else res.status(404).send({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => res.status(500).send({ error: "The post information could not be retrieved." }));
});

server.post('/api/posts', (req, res) => {
  if(req.body.title && req.body.contents) {
    db.insert({title: req.body.title, contents: req.body.contents})
      .then(postId => res.json(postId))
      .catch(err => res.status(400).send({ errorMessage: "Please provide title and contents for the post." }))
  } 
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => res.status(500).send({ error: "The post could not be removed" }));
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
 
  const newPost = { title, contents };
  db.update(id, newPost)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).send({ error: "The post information could not be modified." }));
});

const port = 9000;
server.listen(port, () => 
  console.log(`\n=== API running on port ${port} ===\n`)
  );
