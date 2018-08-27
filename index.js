const express = require("express");

const db = require("./data/db.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Testing Server");
});

// server.get("/api/posts", (req, res) => {
//   db.find()
//     .then()
//     .catch();
// });

server.listen(8000, () => console.log("\n== API on port 8k === \n"));
