// import your node modules

const express = require('express');
const server = express();
const helmet = require('helmet');

server.listen('5000', () => console.log('server listening on port 5000'));
const db = require('./data/db.js');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
knex(knexConfig.development);

server.use(helmet()); // 3
server.use(express.json());

server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db
      .insert(req.body)
      .then((response) => {
        db.findById(response.id) 
          .then (newPost => {
            res.status(201).json(newPost[0]);
          })
          .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
      }); 
  }
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});


server.get('/api/posts/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post[0]);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      }
    })
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

server.delete('/api/posts/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        db
          .remove(req.params.id)
          .then(x => res.status(200).json({ message: "post deleted"}))
          .catch(err => res.status(500).json({ error: 'The post could not be removed' }));
      }
    });
      
});

server.put('/api/posts/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(post => {
      if (post.length === 0) {
        return res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        db
          .update(req.params.id, req.body)
          .then(x => {
            console.log("PUT", x);
            res.status(200).json({ message: "post updated"});
          })
          .catch(err => res.status(500).json({ error: 'The post could not be updated' }));
      }
    });
});
