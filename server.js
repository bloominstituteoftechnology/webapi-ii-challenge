// import your node modules

const express = require('express');

const server = express();

server.listen('5000', () => console.log('server listening on port 5000'));
const db = require('./data/db.js');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const dborm = knex(knexConfig.development);
// add your server code starting here

server.post('/api/posts', (req, res) => {
  if (!req.query.title || !req.query.contents) {
    res.status(400).json({ errorMessage: "Please doit provide title and contents for the post." });
  } else {
    db
      .insert({ title: req.query.title, contents: req.query.contents })
      .then((response) => {
        db.findById(response.id) 
          .then (newPost => {
            return res.status(201).json(newPost);
          })
          .catch(err => res.status(500).json({ error: err }));
      }); 
  }
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: err }));
});
