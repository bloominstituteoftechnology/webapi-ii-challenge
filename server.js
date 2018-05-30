const express = require("express");
const cors = require("cors");

const db = require('./data/db.js');

const port = 6666;
const server = express();

server.use(express.json());
server.use(cors());

