// import your node modules

const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
      .then(posts => {
          console.log('posts:', posts);
          res.json(posts);
      })
      .catch(err => res.send(err));
});




const port = 8001;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===\n`)
);