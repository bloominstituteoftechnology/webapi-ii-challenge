// import your node modules
const db = require('./data/db.js');
const express = require('express');

var cors = require('cors');
const server = express();
// middleware
server.use(express.json()); // teaches express how to parse the JSON request body


server.use(cors());

// add your server code starting here
//GET	'/api/posts'
//returns an array of all the post objects contained in the database.
server.get('/api/posts', (request, response) => {
     db.find() //calling find returns a promise that resolves to an array of all the posts contained in the database.
       .then(posts => {
           response.status(200).json(posts);
        })
       .catch(error => {
            response.status(500).json({error : 'The post could not be retrieved'})
        })
})

//GET	'/api/posts/:id' 	
//Returns the post object with the specified id.
server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    db.findById(id)
      .then(post => {
            if(post.length !== 0) {
                response.status(200).json(post);
            } else {
                response.status(404).json({message : `The post with id : ${id} does not exist `})
            }
       })
      .catch(error => {
            response.status(500).json({error : 'The post could not be retrieved'});
       })
})

//POST	/api/posts	
//Creates a post using the information sent inside the request body
server.post('/api/posts', (request, response) => {
    if(request.body.title !== undefined && request.body.contents !== undefined) {
        db.insert(request.body)
          .then(userId => {
                response.status(201).json(userId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating user', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

//DELETE /api/posts/:id	
//Removes the post with the specified id and returns the deleted post.
server.delete('/api/posts/:id', (request, response) => {
        db.remove(request.params.id)
          .then(count => {
                response.status(200).json(count);
           })
          .catch(error => {
                response.status(500).json({message : 'error deleting user'})
           })
})

//PUT	/api/posts/:id	
//Updates the post with the specified id using data from the request body. 
//Returns the modified document, NOT the original.
server.put('/api/posts/:id', (request, response) => {
    if(request.body.title !== undefined && request.body.contents !== undefined) {
        db.update(request.params.id, request.body)
          .then(count => {
                if(count) {
                    response.status(200).json(count);
                } else {
                    response.status(404).json({ message: "The post with the specified ID does not exist." })
                }
           })
          .catch(error => {
                response.status(500).json({ error: "The post information could not be modified." })
           })
    } else {
        response.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})


server.listen(9000, () => console.log('server is live'));
