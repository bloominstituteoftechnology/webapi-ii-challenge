// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('Server running...');
});

server.listen(3000, () => console.log('Server running...'));
