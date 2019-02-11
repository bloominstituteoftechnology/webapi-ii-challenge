// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());


// add your server code starting here

server.get('/', (req, res) => {
    res.send('Hello World!');
  });

  server.get('/api/posts', (req, res) => {
      db.find()
      .then(posts => {
          res.status(200).json( { success: true, posts})
      })
      .catch(err => {
          res.status(err.code).json({ success: false, message: err.message })
      })
  });
       


server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
  });