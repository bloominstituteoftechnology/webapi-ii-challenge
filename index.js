// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
// add your server code starting here
