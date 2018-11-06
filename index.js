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

// GET posts
server.get('/api/posts', (_, res) => {
  db.find('posts')
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(_ => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    })
});

// GET post by ID
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

// parses incoming requests with JSON and is based on body-parser
// A new body object containing the parsed data is populated on
// the request object after the middleware => req.body
// or an empty {} if no body to parse
server.use(express.json());

// POST new post
server.post('/api/posts', (req, res) => {
  const post = req.body;
  const { title, contents } = post;
  console.log("post newPost", post);

  db.insert(post)
    .then(post => {
      if (!post.title || !post.contents === "") {
        res
          .status(400)
          .json({ errorMessage: "Please provide title and contents for the post." });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(_ => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" });
    })
});

// PUT(UPDATE) an existing post
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;

  db.update(id, post)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} post(s) updated` });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(_ => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
});

// DELETE an existing post
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log('delete postID', id);

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} post(s) deleted.` });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(_ => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
})
