// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require ('express');

const server = express();

server.get("/", (req, res) => {
  res.send("API running");
});

server.get('/api/posts', (req, res)=> {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(error => {
    res.status(500).json({ error : error});
    // error event thing here
  });
});