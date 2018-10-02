// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');
const server = express();

// add your server code starting here

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello');
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      console.log('\n** post **', post);
      res.status(500).json(post);
    })
    .catch(err => res.send(err));
});

server.post('/api/posts', (req, res) => {
  // console.log(req.body);
  // res.send('success!');
  const { title, contents } =  req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        console.log(post);
        if(!post) {
          return res
            .status(422)
            .send({ Error: `Post does not exist by that id ${id}` })
        }
        res.status(201).json(post);
      });
    })
    .catch(err => res.send(err));
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(err => console.error(err));
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
})

const port = 9000;
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`)
})