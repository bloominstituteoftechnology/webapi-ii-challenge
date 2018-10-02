// import your node modules

const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

server.get('/', (req, res) => {
    res.send('Is this working?')
})

const port = 8000
server.listen(port, () => console.log(`\n=== API is running on port ${port} ===\n`));