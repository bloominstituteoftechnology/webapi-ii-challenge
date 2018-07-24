// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db
      .find()
      .then(response => {
        res
          .status(200)
          .json(response);
          return;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved."})
          .end();
      });
});

server.get('/api/posts/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(response => {
      if(!response[0]) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
          .end();
      } else {
        res
          .status(200)
          .json(response);
          return;
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved."})
        .end();
    });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(response => {
      if(!response) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
          .end();
      } else {
        res
          .status(200)
          .json({ message: "Post deleted." });
          return;
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post could not be removed." })
        .end();
    });
});

server.post('/api/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const post = { title, contents };
  if(!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a title and contents for the post." })
      .end();
  } else {
    db
      .insert(post)
      .then(response => {
        db.findById(response.id)
          .then(response => {
            res
              .status(201)
              .json(response);
              return;
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "There was an error." })
              .end();
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "There was an error saving the post to the database." })
          .end();
      })
  }
})

server.listen(8000, () => console.log(`API running on port 8000`));