// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");
const server = express();
// add your server code starting here
server.use(cors());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.listen(4000, () => console.log("Server is listening on port 4000"));
