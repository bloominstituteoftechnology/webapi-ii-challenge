// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express'); // import the express package
const server = express(); // creates the server
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);// assigns a port

server.get('/api/posts', (req, res) => {
    db.find() //calling find method from db.js file 
      .then(posts=> { 
        res.status(200).json(posts);
      }) // once you find them- communicated by 200 status code, display them
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });//if you 'catch' an error as defined by status 500 - let the client know
  });

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; //pull the id off the request 
    db.findById(id) //call findbyid method, passing in id from above
      .then(post => { //then check for ...
        if (post) { // status 200 - we found it!
          res.status(200).json(post);
        } else { // or oops - if we could retrieve it, we would but it's not here, status 404
          res.status(404).json({ message: 
            "The post with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res //if data can't be retrieved ... 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
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
