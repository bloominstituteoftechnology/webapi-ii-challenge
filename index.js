// import your node modules

const db = require("./data/db.js");
const express = require("express");

// add your server code starting here

const app = express();

app.get("/api/posts", (req, res) => {
  db.find().then(
    doc => {
      res.send(doc);
    },
    err => res.status(500).send({ error: "The posts information could not be retrieved" })
  );
});

app.listen(3000, () => console.log("The server is up and listening on port 3000"));
