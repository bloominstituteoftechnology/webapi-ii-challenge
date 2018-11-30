// import your node modules
const express = require('express'); // imports express package
const server = express(); // creates the server

const db = require('./data/db.js');

// add your server code starting here
const hostname = '127.0.0.1'; // local computer ip address
const port = 3000; // port to watch traffic

//middleware
server.use(express.json());

// GET
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => { res.json(posts) })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" })
    })
});

// GET
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params; // destructuring
  db.findById(id)
    .then(post => {
      if (post.length === 1) {
        res.json(post)
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    })
});

// POST
server.post('/api/posts', (req, res) => {
  const post = req.body;
  console.log('post form bod', post);
  if (post.title && post.contents) {
    db.insert(post)
      .then(postId => {
        res
          .status(201) // Created
          .json(post)
      })
      .catch(err => {
        res
          .status(500) // Internal Server Error
          .json({ error: "There was an error while saving the post to the database" })
      })
  } else {
      res
        .status(400) // Bad Request Error
        .json({ errorMessage: "Please provide title and contents for the post." })
  }
});

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = db.findById(id).then(post => { return post })
  db.remove(id)
    .then(count => {
      if (count) {
        res.json(post)
      } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post could not be removed" })
    })
})

// PUT
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.findById(id).then(post => {
            res.json(post);
          })
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" })
        }
      })
      .catch(err => {
        res.status(500)
          .json({ message: "The post information could not be modified" })
      })
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    }
})

//start watching for connections
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
