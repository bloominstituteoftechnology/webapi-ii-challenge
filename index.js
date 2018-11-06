// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express'); // import the express package
const server = express(); // creates the server
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);// assigns a port

server.post('/api/posts', (req, res) => {
    res.status(201).json({ url: '/api/posts', operation: 'POST' });

  });

server.put('/api/posts', (req, res) => {
    res.status(200).json({ url: '/api/posts', operation: 'PUT' });
  });

server.delete('/api/posts', (req, res) => {
    res.status(204);
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    // or we could destructure it like so: const { id } = req.params;
    res.status(200).json({
      url: `/api/posts/${id}`,
      operation: `DELETE for post with id ${id}`,
    });
  });

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
        if (post && post.length) { // status 200 - we found it!
          res.status(200).json(post);
        } else { // or oops - if we could retrieve it, we would but it's not here, status 404
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res //if data can't be retrieved ... 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
/*
When the client makes a POST request to /api/posts:

If the request body is missing the title or contents property:
if (req.body.title === undefined || req.body.contents === undefined || req.body.title === '' || req.body.contents === '' )
cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: 
{ errorMessage: "Please provide title and contents for the post." }.
If the information about the post is valid:

save the new post the the database.
return HTTP status code 201 (Created).
return the newly created post.
If there's an error while saving the post:

cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: 
{ error: "There was an error while saving the post to the database" }.
*/
