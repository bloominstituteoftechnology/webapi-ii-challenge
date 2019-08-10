const express = require('express');

const db =('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.send('Api is up and running'));