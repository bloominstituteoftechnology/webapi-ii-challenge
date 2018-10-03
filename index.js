// import your node modules
const cors = require('cors');
const db = require('./data/db.js');
const express = require('express');
const server = express();

const port = 4140;
server.listen(port, () => {
    console.log(`Port #${port}`)
})

server.use(cors())
// add your server code starting here
server.get('/api/posts', (req, res) => {
    console.log(res.data);
})