// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());

server.get('/', (req, res) => {
  res.send('<h1>Welcome to posts!</h1>');
});

server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    console.log('\n** posts **', posts);
    res.json(posts);
  })
  .catch(err => 
    res.status(500).json({ error: "The posts information could not be retrieved." }));
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  db
    .insert({ title, contents })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

const port = 5000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);