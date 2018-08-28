const express = require('express');
const server = express();
const bodyParser = require('body-parser');
// import your node modules


const db = require('./data/db.js');
// add your server code starting here
server.use(bodyParser.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    })
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if(posts.length === 0){
        res.status(404).json({message: "The post with the specified ID does not exist."})
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
    })
});

server.post('/api/posts', (req, res) => {
  if (req.body.title.length === 0 || req.body.contents.length === 0) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.insert(req.body)
    .then((response) => {
      db.findById(response.id)
        .then((post) => {
          res.status(201).json(post);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
})

server.listen(8000, () => {
  console.log('Listening on port 8000...');
})
