// import your node modules
const express = require('express');
const cors = require('cors');
const port = 9000;

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.use(cors());

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      console.log('** posts **', posts);
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).send({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
  const newPost = { title, contents };
  db.insert(newPost)
    .then((postId) => {
      const { id } = postId;
      db.findById(id).then((post) => {
        console.log(post);
        if (!post) {
          return res.status(400).send({
            errorMessage: 'Please provide title and contents for the post.',
          });
        }
        res.status(201).json(post);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)

    .then((removedPost) => {
      console.log(removedPost);
      if (!removedPost) {
        return res.status(404).send({
          message: 'The post with the specified ID does not exist.',
        });
      }
      res.status(200).json(removedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'The post could not be removed',
      });
    });
});

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
