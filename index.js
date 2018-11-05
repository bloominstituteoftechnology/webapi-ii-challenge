// import your node modules
const express = require("express");
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.listen(9001, () => console.log("the server is on!"));