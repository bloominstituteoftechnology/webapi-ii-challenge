// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const bodyParser = require('body-parser');
server.use(bodyParser.json());
// add your server code starting here
server.post('/api/posts', (req, res) => {
  const {title, contents} = req.body;
  console.log(title, contents)
  console.log(req.body);
  if (title === "" || title === undefined || contents === undefined || contents === "") {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  res.json({title, contents});
})
server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.json(posts);
  }).catch(err => {
    res.json({error: err});
  })
})
server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(post => {
      res.json(post);
    }).catch(err => {
      res.json({error: err});
    })
})
server.listen(5000, () => console.log('server listening on port 5000'))
