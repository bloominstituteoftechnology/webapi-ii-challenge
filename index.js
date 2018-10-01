// import your node modules

const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here

const server = express();

const port = 7500;

server.listen(port, () =>
  console.log(`Testing port ${port}`)
);

server.get('/', (req, res) => {
  res.send('<h3>I am ROOT</h3>')
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.send(`${err}: The posts information could not be retrieved.`)
    })
})
