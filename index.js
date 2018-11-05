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
    .catch(err =>
      res
        .status(500)
        .send({error: "The posts information could not be retrieved."})
    );
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (!posts.length) {
        res
          .status(404)
          .send({message: "The post with the specified ID does not exist."});
      }
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.listen(4000, () => console.log("Server is listening on port 4000"));
