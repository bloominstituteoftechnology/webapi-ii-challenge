// import your node modules
const express = require('express');
const server = express();
// Database
const db = require('./data/db.js');
// Middleware Dependencies
const helmet = require('helmet');
const cors = require('cors');
// add your server code starting here

// Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

/* --- Endpoints --- */
// POST
server.post('/api/posts', (req, res) => {
  const post = req.body;

  db.insert(post)
    .then(result => res.json(result))
    .catch(err => {
      console.log(`'/api/posts' POST error: ${err}`);
      if (err.errno = 19) {
        res.status(400).json({ error: 'Please provide title and contents for the post.'});
      } else {
        res.status(500).json({ error: 'There was an error while saving the post to the database.'});
      }
    });
});

// GET
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err => {
      console.log(`'/api/posts' GET error: ${err}`);
      res.status(500).json({ error: 'The posts\' information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        res.json(post);
      }
    })
    .catch(err => {
      console.log(`'/api/posts/${id} GET error: ${err}`);
      res.status(500).json({ error: "The post information could not be retrieved." });
    })
})

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        db.remove(id)
          .then(count => {
          if (count === 1) {
            res.json(post);
          } else if ( count === 0) {
            res.status(500).json({ message: "The post could not be removed" });
          } else {
            res.status(500).json({ message: "Serious Database Error. Contact administrator."});
          }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }));
      }
    })
})

// PUT
server.put('/api/posts/:id', (req, res) => {
  // Variables
  const { id } = req.params;
  const postInfo = req.body;
  console.log("'/api/users/:id' PUT postInfo:",postInfo,"id:",id);
  // Operation
  db.update(id, postInfo)
    .then(count => {
      console.log("'/api/users/:id' PUT count",count);
      if (count === 1) {
        db.findById(id)
          .then(post => res.json(post))
          .catch(err => res.status(500).json({ error: "Post update successful, but could not retrieve record." }));
        } else if ( count === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
          res.status(500).json({ message: "Serious Database Error. Contact administrator."});
        }
    })
    .catch(err => {
      console.log("'/api/users/:id' PUT error:",err);
      if (err.errno === 19) {
        res.status(400).json({ errorMessage: "Please provide BOTH title and content for the post." });
      } else {
        res.status(500).json({ error: "The post information could not be modified." });
      }
  });
})

// Server Start!
const port = 5000;
server.listen(port, () => console.log(`\n=== Server Listening on Port ${port} ===`));