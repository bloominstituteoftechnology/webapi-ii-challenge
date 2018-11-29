const express = require('express')
// import your node modules


const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000;

server.listen(PORT, () => {
    console.log(`server is now up and running on ${PORT}`)
})