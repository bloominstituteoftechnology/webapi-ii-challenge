// import your node modules
const express = require("express");
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get("/api/posts", (req, res) => {
  db.find()
  .then(posts => {
            res.json({ posts });
        })
  .catch(error => {
    res.status(500).send({ error: "The posts information could not be retrieved." })
  })
});


server.listen(8000, () => console.log('API running on port 8000'));
