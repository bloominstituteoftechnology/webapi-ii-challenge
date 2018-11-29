// import your node modules

const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here

const server = express();
const PORT = 4000;

server.use(cors());

server.get('/api/posts', (req, res) => {
    db
      .find()
      .then((posts) => {
        res.json(posts);
      })
      .catch(err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved."});
      });
});

server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db
    .findById(id)
      .then(post => {
        if (post.length > 0) {
          res.json(post);
        } else {
          res
            .status(404)
            .json({error: "The post with the specififed ID does not exist."});
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "The post informatin could not be retrieved."});
      })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});