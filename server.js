// import your node modules

const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here

server.use(express.json());

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if ( post.title === null || post.contents === null ) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
      db.insert(post)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(() => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
  }
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(() => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response > 0) {
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" })
    })
});

server.put('/api/posts:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if ( post.title === null || post.contents === null ) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.findById(id)
      .then(response => {
        if (response.length < 1) {
          res.status(404).json({message: "The post with the specified ID does not exist."  })
        } else {
          db.update(id, post)
            .then((post) => {
              res.status(200).json(post);
            })
        }
      })
      .catch(() => {
        res.status(500).json({ error: "The post information could not be modified." })
      })
  }
});


server.listen(3000, () => console.log('API running on port 3000'));