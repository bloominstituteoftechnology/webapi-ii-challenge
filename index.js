// import your node modules

const express = require('express');

const cors = require('cors');

const db = require('./data/db.js');

const server = express();

// add your server code starting here

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>EEEEEEEYYYY~</h1>')
})

server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    console.log('\n** posts **', posts)
    res.json(posts);
  }).catch(err => {
    console.error(err)
    res.status(500).send({ error: "The posts information could not be retrieved." })
  })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
  .then(post => {
    if (!post) {
      console.log(post);
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    res.json(post);
  }).catch(err => {
    res.status(500).send({ error: "The post information could not be retrieved."})
  })
})

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        if (!post.title || !post.contents) {
          return res
          .status(400)
          .send({ Error: "Please provide title and contents for the post." });
        }
        res.status(201).json(post);
      });
    })
    .catch(err => {
      console.error(err)
    res.status(500).json({error: "There was an error while saving the post to the database."})
  });
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.remove(id)
    .then(removedPost => {
      res.status(200).json(removedPost);
    })
    .catch(err => {
       console.error(err)
       res.status(500).json({ error: "The post could not be removed"})
    });
})

server.put('/api/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  const updatedPost = { title, contents };
  const { id } = req.params;
  db.update(id, updatedPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        if (!post) {
          return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist."})
        }
        else if (!updatedPost.title || !updatedPost.contents) {
          res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
        }
        res.status(200).json(updatedPost)
      })
     
    })
    .catch(err => console.error(err))
})

const port = 8000;
server.listen(port, () =>
console.log(`\n=== API running on port ${port} ===\n`))
