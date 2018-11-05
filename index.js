// import your node modules

const db = require('./data/db.js');



// watch for connections on port 5000


// add your server code starting here
const express = require('express'); // import the express package
const server = express(); // creates the server
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
server.get('/', (req, res) => {
    res.send('Hello from Express');
  });

server.get('/api/posts', (req, res) => {
    res.send('Hello from Express');
  });

server.get('/api/id', (req, res) => {
    res.send('Hello from Express');
  });
/*

-----When the client makes a GET request to /api/posts:

*If there's an error in retrieving the posts from the database:
cancel the request.
respond with HTTP status code 500.
return the following JSON object: 
{ error: "The posts information could not be retrieved." }.

-----When the client makes a GET request to /api/posts/:id:

*If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: 
"The post with the specified ID does not exist." }.
If there's an error in retrieving the post from the database:

*cancel the request.
respond with HTTP status code 500.
return the following JSON object: 
{ error: "The post information could not be retrieved." }.*/
