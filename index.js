// import your node modules

const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const express = require('express');
const server = express();

server.use(cors());
server.use(express.json());



server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if(post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'findById failed', error: err});
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  if(!newPost || !newPost.title || !newPost.contents){
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db.insert(newPost)
      .then(insertedPost => {
        res.status(201).json({ 'Post Created!': insertedPost });
      })
      .catch(err => {
        res.send(err);
      })
  }
});

// server.put('/api/posts/:id', (req, res) => {
//   res.status(200).json({ url: '/api/posts', operation: 'PUT' });
// });

// server.delete('/api/posts/:id', (req, res) => {
//   res.status(204);
// });

server.listen(9000, () => console.log('Listening on 9000'));
