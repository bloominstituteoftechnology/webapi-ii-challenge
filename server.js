const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());
