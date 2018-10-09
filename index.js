// import express from 'express'; // ES2015 module > export default

const express = require('express'); //  commonJS modulex > module,exports = somwCode

const server = express();

// watch for traffic in particular port

// http://localhost:3000 > 3000 is the port, a place where we can test and run traffic apps
 const port = 9000;
 server.listen(port, () => console.log(` === A11PI running on port ${port} === `))

// import your node modules

const db = require('./data/db.js');

// add your server code starting here
