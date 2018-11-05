// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
const port = 9000;

// add your server code starting here

// testing testing :D
server.get('/', (_, res) => {
  res.json({ message: 'Introduction to NodeJS and Express' });
});

server.get('/api/posts', (_, res) => {
  db.find('posts')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)

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
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    })
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
})
