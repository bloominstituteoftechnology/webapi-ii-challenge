const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log("===SERVER RUNNING ON PORT 5000===");
})


server.get('/', (req, res) => {
    res.send('<h1>===GET REQUEST RECIEVED===</h1>');
})