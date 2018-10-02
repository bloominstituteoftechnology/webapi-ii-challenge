// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj

server.get('/', (req, res) => {
  // request/route handler
  res.send('This is a GET TEST');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.status(500).send({ error: "The posts information could not be retrieved." }));

});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.json(post)
      } else res.status(404).send({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => res.status(500).send({ error: "The post information could not be retrieved." }));
});

const port = 9000;
server.listen(port, () => 
  console.log(`\n=== API running on port ${port} ===\n`)
  );
