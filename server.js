//ASSIGNMENT: Use Node.js and Express to build an API that performs CRUD operations on users.

//we use require() to import the express module and make it available to our application. This is similar to the import keyword we have used before. 
const express = require('express');

// QQQQQQQQQQQQ: What does this middleware do? Will it still function if this line comes after the code below?
const cors = require('cors');

const port = 5555;

//The return of calling express() is an instance of an Express application that we can use to configure our server and, eventually, start “listening” and responding to requests. 
const server = express();

server.use(express.json()); //added support for parsing JSON content out of the request body. All types of middleware are used in the same way. We tell express about the middleware we want to turn on for our application by making a call to .use() on our server and passing it the piece of middleware we want to use. This line must come after the server has been created by calling express().

// QQQQQQQQQQQQQQQ: What does the morgan middleware do?




const db = require('./data/db.js');




server.listen(port, () => console.log(`Server running on port ${port}`));
