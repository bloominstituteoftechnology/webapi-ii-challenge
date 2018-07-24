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

server.get('/api/users', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ error: 'The posts information could not be retrieved.' })
  }
});

server.listen(8000, () => console.log('API running on port 8000'));