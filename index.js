// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
cors = require('cors');

// add your server code starting here
const port = 8000;
server.listen(port, ()=>{
    console.log(`API running on port ${port}`);
})