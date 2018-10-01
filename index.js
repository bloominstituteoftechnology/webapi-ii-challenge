// import your node modules

const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();

server.use(cors());

// add your server code starting here

// GET posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log(posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
});

// GET post
// server.get(`/api/posts/${id}`, (req, res) => {
//   db.find()
//     .then(posts => {
//       console.log(posts);
//       res.json(posts);
//     })
//     .catch(err => res.send(err));
// });

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
