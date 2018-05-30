const express = require('express');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Niloc');
})
