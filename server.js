// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const port = 5000;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Test Test :)');
});

server.listen(port, () => console.log(`Server is running on port ${port}`));