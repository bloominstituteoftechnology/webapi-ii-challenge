const express = require('express');
const server = express();
const db = require('./data/db')

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
  db.find().then((results)=>{
    res.status(200).json(results);
  });
});
server.get('/api/users/:postID', (req, res) => {
  db.findById(req.params.postID).then((results)=>{
    res.status(200).json(results);
  });
});
server.listen(8000, () => console.log('API running on port 8000'));