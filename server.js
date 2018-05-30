const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400);
    res.json({ errorMessage: "Please provide title and contents for the post." });
  }
  else {
    db
      .insert({ title, contents })
      .then(response => {
        res.status(201);
        db.findById(response.id)
          .then(post => {
            res.json({ post });
          });
      })
      .catch(error => {
        res.status(500);
        res.json({ errorMessage: "There was an error while saving the post to the database" });
      });
  }
});


server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.json({ posts });
  })
  .catch(error => {
    res.status(500);
    res.json({ errorMessage: "The posts information could not be retrieved." });
  });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(posts => {
      if (posts.length) {
        res.status(200);
        res.json({ posts });
      }
      else {
        res.status(404);
        res.json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ errorMessage: "The post information could not be retrieved." });
    })
});


server.put('/api/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  const id = req.params.id;
  if (!title || !contents) {
    res.status(400);
    res.json({ errorMessage: "Please provide title and contents for the post." });
  }
  else {
    db
      .update(id, { title, contents })
      .then(success => {
        if (success) {
          res.status(200);
          db.findById(id)
            .then(post => {
              res.json({ post });
            });
        }
        else {
          res.status(404);
          res.json({ errorMessage: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500);
        res.json({ errorMessage: "The post information could not be retrieved." });
      })
  }
});

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db
    .remove(id)
    .then(success => {
      if (success) {
        res.status(200);
        res.json({ success });
      }
      else {
        res.status(404);
        res.json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ errorMessage: "The post could not be removed" });
    })
});


server.listen(port, () => console.log(`Server running on port ${port}`));
