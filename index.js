// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
// add your server code starting here
// server.get('/', (req, res) => {
//     db.find().then
// })




server.listen(6000, () => console.log('server running'));