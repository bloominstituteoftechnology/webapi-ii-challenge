// import your node modules
const express = require('express')

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4545;


server.listen(PORT, () => {
    console.log(`The server is runnning on port ${PORT}`);
});