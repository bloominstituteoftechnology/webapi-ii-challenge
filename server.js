const express = require('express');
const helmet = require('helmet');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(helmet());
server.use(express.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => {
  res.send('Node Express Lab');
});

server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ error: 'The posts information could not be retrieved.' })
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.'});
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post information could not be retrieved.' });
  }
});

server.listen(8000, () => console.log('API running on port 8000'));