// import your node modules

const express = require('express'); // CommonJS modules > modules.exports = someCode;
const cors = require('cors');
const db = require('./data/db.js');
const server = express(); // creates the server

// add your server code starting here

server.use(cors()); // this needed to connect from react

server.get('/api/posts', (req, res) => {
  db.find()
    .then(users => {
      console.log('\n** posts **, posts');
      res.json(users);
    })
    .catch(err => res.send(err));
});

const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
