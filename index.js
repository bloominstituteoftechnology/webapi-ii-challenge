// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

server.get('/users', (req, res) =>
  db
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ message: 'Error' });
    })
);

server.listen(9000, () =>
  console.log('\n == server listening on port 9000 ==\n')
);
