// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const PORT = 4001;
// add your server code starting here
server.get('/api/posts', (request, response) => {
  db.find()
    .then((posts) => {
      response.json(posts)
    })
    .catch((err => {
      res.json({ error: "The posts information could not be retrieved." }.status(500))
    }));
});

server.get('/api/posts/:id', (request, response) => {
  const { id } = request.params;
  db.findById(id)
    .then((post => {
      if (post.length>0) {
        response.json(post);
      }
      else {
        response.status(404).json({ error: 'cannot find a post with that ID' });
      }
    }))
    .catch(err => {
      response.status(500).json({ error: 'failed to get post' })
    });
});


server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`)
})