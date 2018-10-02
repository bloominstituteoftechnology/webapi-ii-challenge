// Node Modules
const express =  require('express');
const cors = require('cors');
const db = require('./data/db.js');

// Instatiate Server
const server = express();
server.use(cors());
server.use(express.json());


// ##### Error Messages #####
const missingDataError = { errorMessage: "Please provide title and contents for the post." }
const invalidTypeError = { errorMessage: "Post title and contents must be a string." }
const postNotFound = { errorMessage: "The post with the specified ID does not exist." }
const single500 = { errorMessage: "The post information could not be retrieved" }

// ##### Root directory server READ #####
server.get('/', (request, response) => {
    response.status(200).send(`<h1>Welcome to the LOTR Post Server!</h1>`);
});

// ##### READ All Posts #####
server.get('/api/posts', (request, response) => {

    // Unique Error Messages
    const error500 = { errorMessage: "The posts information could not be retrieved" };

    // Database Promise Method
    db.find()
    .then(posts => response.status(200).send(posts))
    .catch(
        error => {
            response.status(500).json(error500)
        })
});

// ##### READ Individual Post
server.get('/api/posts/:id', (request, response) => {

    db.findById(request.params.id)
    .then(post => 
        {   if (post.length > 0) {
            response.status(200).send(post)}
            else response.status(404).send(postNotFound);
        })
    .catch(error => response.status(500).send(single500))
});

// ##### CREATE New Post #####
server.post('/api/posts', (request, response) => {

    // Destructuring Request Body For Validation
    const {title, contents} = request.body;

    // Unique Error Messages 
    const errorSavingPost = { errorMessage: "There was an error while saving the post to the database." }
    
    // Error Handling Conditionals
    if(!title && !contents) {
        response.status(400).send(missingDataError);
    }

    if (!typeof title === typeof contents === 'string') {
        response.status(400).send(invalidTypeError);
    }

    // Database Promise Method
    db.insert({title, contents})
    .then(postId => response.status(201).send(postId))
    .catch(() => response.status(500).send(errorSavingPost))    
});

// ##### UPDATE Existing Post #####
server.put('/api/posts/:id', (request, response) => {

    // Destructuring Request Body For Validation
    const {title, contents} = request.body;

    // Unique Error Messages
     const error500 = { errorMessage: "The post information could not be modified." };

    // Error Handling Conditionals
    if(!title && !contents) {
        response.status(400).send(missingDataError);
    }

    if (!typeof title === typeof contents === 'string') {
        response.status(400).send(invalidTypeError);
    }

    // Database Promise Methods
    db.update(request.params.id, {title, contents})
    .then(updated => {
        if (updated) {
            db.findById(request.params.id)
            .then(post => 
                {   if (post.length > 0) {
                    response.status(200).send(post) 
                } else { 
                    response.status(404).send(postNotFound);
                }})
            .catch(() => response.status(500).send(single500))
        } else { 
            response.status(404).send(postNotFound);
    }})
    .catch(() => response.status(500).send(error500))
});

// ##### DELETE Existing Post #####
server.delete('/api/posts/:id', (request, response) => {
    
    // Unique Error Messages
    const error500 = { errorMessage: "The post could not be removed" };

    // Database Promise Methods
    db.findById(request.params.id)
    .then(post => 
        {if (post.length > 0) {
            db.remove(request.params.id)
            .then( deleted => {
                if(!deleted) {
                    response.status(404).send("squiggly");
                }
                response.status(200).send(post) 
            })
            .catch(() => response.status(500).send(error500))
        } else { 
            response.status(404).send(postNotFound);
        }})
    .catch(() => response.status(500).send(single500))
});

// Activate Server on Port
const port = 7777;
server.listen(port, console.log(`=-=-= Server Active On Port ${port} =-=-=`));