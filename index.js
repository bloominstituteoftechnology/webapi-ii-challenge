// import your node modules

const express = require('express');

const db = require('./data/db.js');

const server = express();
server.get('/', (req, res) => {
    res.json('active');
});

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved.", error: err });
      });
  });
  
  

server.listen(9000, () => console.log('the server is active'));