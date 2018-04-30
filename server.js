// import your node modules
const express = require("express");

const server = express();
const db = require("./data/db.js");

// add your server code starting here
server.get("/", (req, res) => {
  res.send("Api Running");
});

server.listen(5000, () => console.log("\n== API running on port 5000 ==\n"));
