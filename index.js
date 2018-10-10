// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here

//Express is the de-facto framework for building node.js servers and REST APIs


const server = express(); // Creates a server

const port = 6000;
server.listen(port, () => console.log( `API is running on port ${port}`));
