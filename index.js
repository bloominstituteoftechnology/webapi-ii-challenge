// import your node modules
const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const cors = require('cors');

const db = require('./data/db.js');

server.use(cors());
server.use(express.json());

// quick text display to make sure everything loads properly

// general get statements
server.get('/', (req, res) => {
  console.log('test');
  res.send('Testing server.');
});

server.get('/posts', (req, res) => {
  db.find().then(posts => {
    console.log('\n** posts **', posts);
    res.json(posts);
  })
  .catch(err => res.status(500).send({ error: "The posts\'s information could not be retrieved. "})
  );
});

// create a new post

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(id => {
      db.findById(id)
        .then(post => {
          res.status(201).json(post);
        });
    })
    .catch(err => res.status(400).send({ error: "Please provide title and contents for the post." })
    );
});

// delete a post

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

// edit post with specified //

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };

  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(err => console.log(err));
});

// find a specific post by id

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    console.log('\n** post at specified id **', post);
    res.json(post);
  });
})

// listen on port 8000

server.listen(8000, () => console.log('Server listening on port 8000.'));
