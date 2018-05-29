const express = require('express');
const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.post('/api/posts', (req, res) => {

});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status().json({ error: 'The posts information could not be retrieved.' })
    });
});

server.get('/api/posts/:id', (req, res) => {

});

server.delete('/api/posts/:id', (req, res) => {

});

server.put('/api/posts/:id', (req, res) => {

});

server.listen(port, () => console.log(`Server running on port ${port}`));
