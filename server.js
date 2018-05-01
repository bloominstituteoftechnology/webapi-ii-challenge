// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
  res.send('Api is running!');
})

server.get('/api/posts', (req, res) => {
  //get the users
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
    //do something with the error
    });

  //return the users
})

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      //do something with the error
    });

})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'))
