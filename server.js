// import your node modules
const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400)
      .json({ errorMessage: "Please provide title and contents for the post." });
    return;  
  }
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(() => {
      res.status(500)
        .json({ error: "There was an error while saving the post to the database" });
    });
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(response => res.status(200).json(response))
    .catch(() => res.status(500)
      .json({ error: "The posts information could not be retrieved." })
    );
});

server.listen(8000, () => console.log('API running on port 8000'));
