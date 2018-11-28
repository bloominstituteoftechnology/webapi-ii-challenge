// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 4040;

server.get('/api/',(res, req))

server.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})