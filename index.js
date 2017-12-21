console.log ('index is executed'); // CommonJS module syntax 
// import express from 'express'; // ES2015 module syntax 

const express = require('express');
const server = express(); // this is a web server 

server.get('/', function(req, res))
  res.send(<h1>Hello CS5!</h1>)<p>This is a long paragraph</p>;
});

const port = 8000; 
server.listen(port, () => console.log('Server running on ${port}));

// npm i -g nodemon 
// yarn global add nodemon

// to run the server type nodemon index.js
// to stop the server when running use ctrl + c.
// to restart the server if running with nodemon just type rs
// http://localhost:8000/