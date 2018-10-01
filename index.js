// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');
const server = express();

// add your server code starting here

server.use(cors());

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

const port = 9000;
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`)
})