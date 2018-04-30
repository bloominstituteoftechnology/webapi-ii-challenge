const express = require('express');

const db = require('./data/db');

const server = express();

// resolve '/'
server.get('/', (req, res) => {
  res.send('Api running');
})

// get posts
server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.json(posts);
  }).catch(err => { 
    res.end(500).json({ error: 'The posts information could not be retrieved.' });
  });
});

// get posts by ID
server.get('/api/posts/:id', (req, res) => {
 const id = req.params.id;

db
  .findById(id)
  .then(posts => {
    if (posts.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
    res.json(posts[0]);
    }
  })
  .catch(err => { 
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

// Delete posts by ID
server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
  .findById(id)
  .then(posts => {
    if (posts.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
    res.json(posts[0]);
    }
  })
  .catch(err => { 
    res.status(500).json({ error: "The post could not be removed" });
  });

})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));



