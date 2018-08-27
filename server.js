// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

server.get('/', (req, res) => {
  res.send('Hello CS12');
});

server.get('/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts);//this replaces the .send() method above but they perform a similar action. .status() sends an http status code. .json() is used to indicate the datatype that is going to be returned. Which is a json object.
  })
  .catch(err => {
    console.error('error', err);
    res.status(500).json({message: 'error getting data'})
  })
})

server.listen(9001, () => console.log("== API on port 9k =="));
