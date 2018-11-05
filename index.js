// import your node modules

const express = require('express');

const db = require('./data/db.js');

const server = express();
server.get('/', (req, res) => {
    res.json('active');
});


// add your server code starting here
