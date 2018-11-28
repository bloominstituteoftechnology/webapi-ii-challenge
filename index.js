// import your node modules
const express = require('express'); // imports express package
const server = express(); // creates the server

const db = require('./data/db.js');

// add your server code starting here
const hostname = '127.0.0.1'; // local computer ip address
const port = 3000; // port to watch traffic

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => { res.json(posts) })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" })
    })
})

server.get('/api/posts/:id', (req, res) => {
  res.json({ Hello: 'message' })
})

//start watching for connections
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
