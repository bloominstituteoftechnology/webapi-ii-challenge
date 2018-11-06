// import your node modules

const db = require('./data/db.js');

// add your server code starting here
// implement your API here
// how to import/export code between files -- the Node way
// introduce how routing works
const express = require("express");
const cors = require('cors') //needed to connect to React
const server = express(); //creates the server

server.use(cors()) // needed to connect from React
server.use(express.json())

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents};
  db.insert(newPost)
  .then(postId => {
    const { id } = postId
    if (!post) {
      return res.status(422).send({Error: `Post does not exist by that id ${id}`})
    }
    db.findById(id)
    .then(post => {
      res.status(201).json(post)
    })
  })
  .catch(err => console.log(err))
})

server.delete(`/api/posts/:id`, (req, res) => {
  const { id } = req.params;
  db.remove(id)
  .then(removedPost => {
    res.status(200).json(removedPost)
  })
  .catch(err => console.error(err))
})

server.get("/api/posts", (req, res) => { // cb is Route Handler
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

// watch for traffic in a particular port
const port = 8000;
server.listen(port, () => console.log(`==API running on ${port}==`));