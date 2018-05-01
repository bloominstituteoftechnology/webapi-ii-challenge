import { WSAEUSERS } from "constants";

// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

// Get posts
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "Can't get posts!" });
    });
});
