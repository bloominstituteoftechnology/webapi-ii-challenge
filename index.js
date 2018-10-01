// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(cors());



const port = 9001;
server.listen(port, () => console.log(`~~~ API running on port ${port} ~~~`));
