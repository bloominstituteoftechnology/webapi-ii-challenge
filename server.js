// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {

});


server.listen(5000, console.log('\n== API Running on port 500 ==\n'));