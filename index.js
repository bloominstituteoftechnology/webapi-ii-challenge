// import your node modules
const express = require('express');
const cors = require('cors');

const server = express();

const db = require('./data/db.js');

server.use(express.json())
// add your server code starting here
server.use(cors());

server.get('/', (req, res) => {
  res.send('yo yo amigow')
})

server.get('/posts/', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.error('error', err)
    })
})

server.get('/api/posts/:id', (req, res) => {
  console.log(req);
  db.findById(1)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.error('error', err)
    })
})

server.listen(3030, () => console.log('\n\n == yes whatever port 7000 == \n\n'))
