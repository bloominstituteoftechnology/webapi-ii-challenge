// import your node modules
const express = require('express');
const cors = require('cors');
const server = express();

server.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

server.post('/api/posts', async (req, res) => {
  console.log('body:', req.body);
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    res.status(201).json(postId);
  } catch (error) {
    res.status(500).json({ message: 'error creating post!!!', error });
  }
});

server.listen(7777, () => console.log('server is operational'));