const express = require('express');
const db = require('./data/db.js')
const server = express();

server.use(express.json());

//Configure Routing
server.get('/', (req, res) => {
    res.send('Server Initiated');
});

server.listen(9000, () => console.log('\n==API on port 9k==\n'));