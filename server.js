// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

// server.post("/", (req, res) => {});

server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));
