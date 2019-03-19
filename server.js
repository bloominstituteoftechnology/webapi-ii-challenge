const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("works !");
});

module.exports = server;
