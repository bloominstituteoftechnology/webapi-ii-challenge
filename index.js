// import your node modules
const express = require('express');
const cors = require('cors');
const port = 9000;

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.use(cors());

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      console.log('** posts **', posts);
      res.json(posts);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' })
    );
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
