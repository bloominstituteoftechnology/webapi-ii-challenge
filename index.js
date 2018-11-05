// import your node modules
const http = require('http');
const hostname = '127.0.0.1'
const port = 9000;
console.log('Hello Kat!')
const db = require('./data/db.js');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World from Node\n');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// const express = require('express');
// const server = express();

// const express = require('express');

// const server = express();
// server.listen(9000, () => console.log('the server is alive!'));
// add your server code starting here
// server.get('/', (req, res) => {
// //   // res.send('<h1>Hello Kat</h1>');
// //   // res.send('{api: alive}');
//   res.json('alive');
// }) 


// server.listen(9000, () =>
//   console.log('the server is alive!')
// )


// {
//   title: "The post title", // String, required
//   contents: "The post contents" // String, required
// }

/*
// When the client makes a GET request to /api/posts:

// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.
// When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.
*/