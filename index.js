console.log ('index is executed'); // CommonJS module syntax 
// import express from 'express'; // ES2015 module syntax 

const express = require('express');
const server = express(); // this is a web server 

// middleware 
// client -sends-> request -to-> [server] -run->middleware -then run-> (request handlers)
server.use(function(req, res, next) {
  console.log('middleware 1')
  next(); 
});

server.use(function(req, res, next) {
  console.log('middleware 2')
});

server.get('/', function(req, res) { // req, res === the homies 
  res.send(<h1>Hello CS5!</h1>)<p>This is a long paragraph</p>);
});

const port = 8000; 
server.listen(port, () => console.log('Server running on ${port}));

// npm i -g nodemon 
// yarn global add nodemon

// to run the server type nodemon index.js
// to stop the server when running use ctrl + c.
// to restart the server if running with nodemon just type rs
// http://localhost:8000/