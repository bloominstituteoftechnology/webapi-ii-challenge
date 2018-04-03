const express = require("express");
const db = require("./data/db.js");
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

// add your server code starting here

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get("/", function(req, res) {
  res.send({ api: "Running...." });
});

server.get("/api/posts", function(req, res) {
  db
    .find()
    .then(posts => {
      res.send(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// server.get("/api/posts/:id", function(req, res) {
//localhost:5000/api/posts/search?userid=  
server.get("/api/posts/search", (req, res) => {
  //const { id } = req.params;
  const { userid } = req.query;
  db
    //.findById(id)
    .findById(userid)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.post("/api/posts", function(req, res) {
  const post = req.body;
  db
    .insert(post)
    .then(posts => {
      res.send(posts);
    })
    .catch(error => {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    });
});

server.delete('/api/posts/:id', (req,res) => {
  let post;
  const { id } = req.params;
  db
  .findById(id)
  .then(response => {
    post = {...response[0]};
    db
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
  .catch(error => {
    res.status(500).json(error);
  })
});


server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  db
  .update(id, update)
  .then(count => {
  if (count > 0) {
      db.findById(id).then(updatedUsers => {
      res.status(200).json(updatedUsers[0]);
      });
  } else {
      res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' });
  }
  })
  .catch(error => {
  res.status(500).json(error);
  });
});

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000"));
