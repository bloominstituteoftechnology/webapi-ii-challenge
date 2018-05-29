const express = require('express');
const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;

  if(title === undefined || contents === undefined){
    res.status(400).json({ error: 'Please provide title and contents for the post.' });
  } else {
    db
      .insert({ title, contents })
      .then(postId => {
        db
          .findById(postId.id)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(error => {
            res.status(500).json({ error: 'There was an error returning the saved post.' });
          });
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' });
      });
  }
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
  const { id } = req.params;

  db
    .findById(id)
    .then(post => {
      if(post.length === 0){
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(post => {
      if(post.length === 0){
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      } else {
        db
          .remove(id)
          .then(records => {
            if(records > 0){
              res.status(200).json(post);
            } else {
              res.status(500).json({ error: 'The post could not be removed.' });
            }
          })
          .catch(error => {
            res.status(500).json({ error: 'The post could not be removed.' });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ error:'The post could not be removed.' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if(title === undefined || contents === undefined){
    res.status(400).json({ error: 'Please provide title and contents for the post.' });
  } else {
    db
      .update(id, { title, contents })
      .then(records => {
        if(records > 0){
          db
            .findById(id)
            .then(post => {
              res.status(200).json(post);
            })
            .catch(error => {
              res.status(500).json({ error: 'There was an error returning the modified post.' });
            });
        } else {
          res.status(404).json({ error: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'The post information could not be modified.' });
      });
  }
});

server.listen(port, () => console.log(`Server running on port ${port}`));
