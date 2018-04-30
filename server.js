const express = require('express');

const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('Api running');
})

// get users
server.get('/api/users', (req, res) => {
  // get the users
  db.find().then(users => {
    res.json(users);
  }).catch(err => { 
    res.status(500).json({ error: err });
  });
});

// /api/users/3 (by ID)
server.get('/api/users/:id', (req, res) => {
  // grab id from url params
 const id = req.params.id;

db
  .findById(id)
  .then(users => {
    if (users.length === 0) {
      res.status(404).json({ message: 'user not found' });
    } else {
    res.json(users[0]);
    }
  })
  .catch(err => { 
    res.status(500).json({ error: err });
    // do something with err 
  });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));



