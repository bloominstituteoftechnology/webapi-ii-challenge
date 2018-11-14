// import your node modules
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
// server.use((request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
server.use(express.json());

const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.json('Welcome to the server! Try adding: /api/posts');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Sorry, we're having some trouble getting the posts..." })
    })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found!!!" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Sorry, we're having trouble getting that post...", error: error })
    })
})

server.post('/api/posts', async (req, res) => {
  console.log('body:', req.body);
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    const post = await db.findById(postId.id)
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'error creating post!!!', error });
  }
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the post!!!!', error })
    });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting post!!!' })
    })
});

server.listen(7777, () => console.log('server is operational'));