// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to your training day user');
} );


server.listen(5000, () => console.log('/n== API on port 5k==/n') );