// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here

const PORT = 4001;
const server = express();

server.listen(PORT, err => {
    console.log(`server is running`)
});