// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world');
});

server.listen(9000, () => console.log('listen test'));