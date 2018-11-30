// import your node modules

const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');


// add your server code starting here

const server = express();
const PORT = 4000;
const purser = express.json();

server.use(purser);

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

// Post request

server.post('/api/posts', (req, res) => {
  const posts = req.body;

  if (posts.title && posts.contents) {
    db
      .insert(posts)
      .then(idInfo => {
        db.findById(idInfo.id).then(posts => {
          res
          .status(201)
          .json(posts);
        })
      })
      .catch(err => {
        res
        .status(500)
        .json({ message: "There was an error while saving the post to the database" })
      })
  } else {
    res
    .status(400)
    .json({ message: "Please provide title and contents for the post."})
  }
});

// Delete Request

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(count => {
      if (count) {
        res
          .json({ message: "Successfully deleted."})
      } else {
        res
        .status(404)
        .json({ message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post could not be removed." })
    })
})

// Always at the bottom!!!!!
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});