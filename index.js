// import your node modules
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.listen(5000, () => console.log("Server is running on port: 5000"));
