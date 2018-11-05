// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");
// add your server code starting here

server.get("/", (req, res) => {
  res.send("sup");
});

server.get("/api/posts", (req, res) => {
  res.send("sup");
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params;
  res.send({ sup: id });

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "nah" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "cannot get user: ", error: err });
    });
});

server.listen(9000, () => console.log("server be runnin"));
