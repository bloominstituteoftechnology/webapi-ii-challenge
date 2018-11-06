// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();
const port = 9000;

// add your server code starting here
// server.use(cors());
// or
server.use(cors({ origin: 'http://localhost:3000' }));

// testing testing :D
server.get('/', (_, res) => {
  res.json({ message: 'Go to /api/posts' });
});

// GET users
server.get('/api/posts', (_, res) => {
  db.find('posts')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(_ => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    })
});

// GET user by ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(_ => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    })
});

// parses the JSON request body
server.use(express.json());

// POST new user
server.post('/api/posts', (req, res) => {
  const newUser = req.body;
  console.log("newUser", newUser);

  db.insert(newUser)
    .then(user => {
      if (user) {
        res.status(201).json(newUser);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide title and contents for the post." });
      }
    })
    .catch(_ => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" });
    })
})

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
})
