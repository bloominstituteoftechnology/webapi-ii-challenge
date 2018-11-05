// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');

const server =express();

server.get('/', (req, res) => {
    res.json('hello');
});

server.listen(9003, () => console.log('server is working'));

