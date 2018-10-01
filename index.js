// import database handler
const db = require("./data/db.js");

// import express
const express = require("express");

// import cors
const cors = require("cors");

// instantiate express server
const server = express();

server.listen(8000, () => console.log("API listenint on port 8000"));
