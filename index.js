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
server.use(logger)

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
  
    next();
  }

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body;
    const updatedPost = {  title, contents }
    db.update(id, updatedPost)
    .then(post => {
       if(post) { res.status(200).json({message: `${post} post updated `})
       } else{
           res.status(404).json({message: 'error user not found'})
       }
    })
    .catch(err => console.log(err, 'error'))
})

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
// get by id
server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
     db.findById(id)
      .then(post => {
        if (post.length) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "post not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "failed", error: err });
      });
  });

server.get("/api/posts", (req, res) => { // cb is Route Handler
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

// watch for traffic in a particular port
const port = 8000;
server.listen(port, () => console.log(`\n==^_^==API running on ${port}==^_^==\n`));