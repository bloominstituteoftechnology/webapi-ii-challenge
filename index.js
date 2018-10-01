// MODULES
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// SERVER SETUP
const server = express();
server.use(cors());

// API ENDPOINTS
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      console.log("posts", posts);
      res.json(post);
    })
    .catch(err => {
      // 1
      // console.log(err.statusMessage)

      // 2
      // res.status(500).send(res.statusMessage);
      
      // 3
      // res.status(500).json({ error: "The posts information could not be retrieved." })
      
      // 4 
      // res.statusMessage = "The posts information could not be retrieved.";
      // res.status(500).end();

      // 5
      res.status(500).json({ error: "The posts information could not be retrieved." });
      return;
    });
})

// PORT LISTENER
const port = 8000
server.listen(port, () => console.log(`=== ${port} active ===`))
