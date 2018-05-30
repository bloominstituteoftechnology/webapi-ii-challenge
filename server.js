// import your node modules
// importing express
const express = require('express');
const db      = require('./data/db.js');

// add your server code starting here
const port   = 5001;
const server = express();
server.use(express.json());


// calling serving to listen to traffic 
server.listen(port, () => console.log(`Server running on port ${port}`));