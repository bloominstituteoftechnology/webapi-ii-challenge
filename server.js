// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.get('/', (req,res) => {
  res.send('help');
})

server.get('/api/posts', (req, res) => {
  const posts = db.find();
  console.log(posts);
});

server.listen(8000, () => {
  console.log('Listening on port 8000...');
})
