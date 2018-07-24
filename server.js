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
    })
})

server.listen(8000, () => console.log(`API running on port 8000`));