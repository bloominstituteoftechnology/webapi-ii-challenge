// import your node modules

const db = require('./data/db.js');
const express = require("express");
const server = express();
const PORT = 4000;

// add your server code starting here

server.get("/api/posts", (req, res) => {
   db.find()
      .then(post => {
         if(post) {
            res.json(post);
         } else {
            res.status(500).json({ error: "The posts information could not be retrieved." })
         }
      })
      .catch(err => {
         res.status(500).json({ error: "The posts information could not be retrieved." })
      })
});

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})