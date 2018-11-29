// import your node modules
const express = require('express');
const server = express();
server.use(express.json());
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here



server.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});