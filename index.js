// import your node modules

const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here

const server = express();

server.use(express.json());

const port = 7500;

server.listen(port, () =>
  console.log(`Testing port ${port}`)
);

server.get('/', (req, res) => {  
  res.send('<h3>I am ROOT</h3>')
});

server.get('/api/posts', (req, res) => {  
  db.find()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
});


server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        if (!title || !contents) {
          return res.status(400)
            .send({ errorMessage: "Please provide title and contents for the post." });
        }
        res.status(201).json(post)
      })
    })
    .catch(err => console.log(err));
});