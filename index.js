const express = require('express');
const server = express();
const db = require('./data/db.js');
const port = 3000;


server.get('/api/posts', (req, res) => { db.find().then( posts => res.json(posts)) });


server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
