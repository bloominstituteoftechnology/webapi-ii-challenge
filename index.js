// import your node modules

const express = require('express'); // CommonJS modules > modules.exports = someCode;
const cors = require('cors');
const db = require('./data/db.js');
const server = express(); // creates the server

// add your server code starting here

server.use(cors()); // this needed to connect from react

server.get('/', (req, res) => {
  // request or route handler function
  res.send('<code>Nothing Here</code>');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/api/about', (req, res) => {
  res.status(200).send('<h1>About This API</h1><p>This is a test message</p>');
});

const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
