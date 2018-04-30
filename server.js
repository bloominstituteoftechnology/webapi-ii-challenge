// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
// add your server code starting here

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(posts => {
      if (posts.length ===0) {
        res.status(404).json({ message: 'post not found' });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

server.post('/api/posts', (req, res) => {

});

server.put('api/posts/:id', (req, res) => {

});


server.delete('api/posts/:id', (req, res) => {
  
});

server.listen(3000, () => console.log('\n... API Running on port 3000 ...\n'));