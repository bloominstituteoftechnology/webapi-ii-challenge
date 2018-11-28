// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
