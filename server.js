const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log("===SERVER RUNNING ON PORT 5000===");
})


