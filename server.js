// import your node modules
const express = require("express"); // call express framework
const CORS = require('cors'); // cross-origin resource sharing
const morgan = require('morgan'); // middleware logger
const helmet = require('helmet'); // middleware security
const router = require('./users/userRouter'); // routes

const server = express(); // instantiate express server

//middleware 
server.use(morgan('dev')); // use morgan logger
server.use(helmet()); // use helmet security
server.use(express.json()); // parse payload in json
server.use(CORS()); // deal with cross-origin resource sharing bug
server.use('/api/posts/', router); // use the imported routes

// add your server code starting here
const port = 5000; // listen on port 5000
server.listen(port, () => console.log("API Running on port 5000")); //execute listening
