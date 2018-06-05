// import your node modules
const express = require('express')
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('API running');
})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));