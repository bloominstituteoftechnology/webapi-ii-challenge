// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

server.use(cors());

const port = 5000;
server.listen(port, () => console.log(`--- Server running on port ${port} ---\n`));

server.get('/', (req, res) => {
  res.send('<h1>Welcome to posts!</h1>')
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(response => res.json(response))
    .catch(err => res.status(500).json({error: "The post information could not be retrieved."}))
})