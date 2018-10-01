// import your node modules

const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Go to http://localhost:8001/api/posts to see the list of posts.')
});


server.get('/api/posts', (req, res) => {
    db.find()
      .then(posts => {
          console.log('GET should have retrieved your posts!');
          res.json(posts);
      })
      .catch(err => res.send(err));
});

const port = 8001;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===\n`)
);