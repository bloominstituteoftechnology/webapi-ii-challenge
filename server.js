const express = require('express');
const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.listen(port, () => console.log(`Server running on port ${port}`));
