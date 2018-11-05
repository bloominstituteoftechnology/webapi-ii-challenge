// import your node modules
const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.send('<h2>hello test</h2>')
});
server.listen(8000, () => console.log('the server is alive!'));
