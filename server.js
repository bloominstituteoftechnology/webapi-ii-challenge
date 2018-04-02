// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', (req, res) => {
  res.json({ api: 'Running...' });
});

// server.post('/api/posts', (req, res) => { // POST Endpoint
//   db
//     .insert(posts)
//     .then(posts => {
//       req.json(posts);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

server.get('/api/posts', (req, res) => { // GET Endpoint
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => { // GET ID Endpoint
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json({ message: "The post with the specified ID does not exist." });
    });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));