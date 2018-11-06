// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here
server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    if (post.length) {
      console.log("If true", post)
      res.status(200).json({ post: post });
    } else {
      console.log("If flaes", post)
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
})

server.listen(9000, () => {
  console.log('Server is up on 9000!');
});
