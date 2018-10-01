// import your node modules

const express = require('express');

const cors = require('cors');

const db = require('./data/db.js');

const server = express();

// add your server code starting here

server.use(cors());

server.get('/', (req, res) => {
  res.send('<h1>EEEEEEEYYYY~</h1>')
})

server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    console.log('\n** posts **', posts)
    res.json(posts);
  }).catch(err => res.send(err, `500`, `{ error: "The posts information could not be retrieved." }`))
})


server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  db.findById(id)
  .then(post => {
    console.log('\n ** single post **', post)
    res.json(post);
  }).catch(err => res.send(err))
})

const port = 8000;
server.listen(port, () =>
console.log(`\n=== API running on port ${port} ===\n`))
