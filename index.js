// import your node modules
const db = require('./data/db.js');
const express = require('express'); // import the express package
const server = express(); // creates the server

server.use(express.json()); // middleware ---- teaches express how to parse the JSON request body
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);// assigns a port

//----- POST -----

server.post('/api/posts', async (req, res) => {
    try {
        const postData = req.body;
        const postId = await db.insert(postData);
        const post = await db.findById(postId.id);
        res.status(201).json(post);
         if (post.title === undefined ||  post.title === '' || post.contents === undefined || post.contents === '' ) {
           const errorMessage = "Please provide title and contents for the post"; 
         throw res.status(400).json({ errorMessage, error });
         }
    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" }.);
    }
  });

//----- PUT -----

server.put('/api/posts', (req, res) => {
    res.status(200).json({ url: '/api/posts', operation: 'PUT' });
  });

//----- DELETE -----

server.delete('/api/posts', (req, res) => {
    res.status(204);
});

//----- DELETE -----

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    // or we could destructure it like so: const { id } = req.params;
    res.status(200).json({
      url: `/api/posts/${id}`,
      operation: `DELETE for post with id ${id}`,
    });
  });

//----- GET -----

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

//----- GET -----

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

CATCH 
If the request body is missing the title or contents property: 
cancel the request. respond with HTTP status code 400 (Bad Request).
return the following JSON response: 
{ errorMessage: "Please provide title and contents for the post." }.
If the information about the post is valid:

TRY 
save the new post the the database.
return HTTP status code 201 (Created).
return the newly created post.

CATCH 
If there's an error while saving the post:
cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: 
{ error: "There was an error while saving the post to the database" }.
*/
