// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The posts information could not be retrieved'});
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.find(id)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The posts information could not be retrieved'});
  });
});


// add your server code starting here
server.listen(5000, () => console.log('Hello'))
