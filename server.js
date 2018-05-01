// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();


// Adding Middleware:
server.use(express.json());

// Route Handlers
// Post a Post 

server.post('/api/posts', (request, response) => {
    const id = request.params.id;
    let title = request.body.title;
    let contents = request.body.contents;
    let post = { title, contents };

    db
        .insert(post)
        .then(post => {
            response.status(201);
            response.json(post);
        })
        .catch(error => {
            if (!title || !contents) {
                response.status(400);
                response.json({ errorMessage: 'Please provide title and contents.' })
            }
            response.status(500);
            response.json({ error: 'There was an error while saving the post to the database.' })
        })

});

// Get a Post
server.get('/api/posts', (request, response) => {

    db
        .find()
        .then(post => {
            response.json(post)
        })
        .catch(error => {
            response.status(500);
            response.json({ error: 'The post information cannot be retrieved.' })
        })
});

// Get a Post by Id
// MAke the response go when id doesnt exist
server.get('/api/posts/:id', (request, response) => {
    const { id } = request.params;
    let postBody = request.body

    db
        .findById(id)
        .then(post => {
            response.json(post)
        })
        .catch(error => {
            if (postBody.length === 0) {
                response.status(404).response.json({ message: 'The post with specified ID does not exist' })
            }
            response.status(500);
            response.json({ error: 'the Post information could not be found' })
        })
    
});

// Delete a Post by Id
// MAke the response go when id doesnt exist
server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db
        .remove(id)
        .then(post => {
            if (id === 0 ) {
                response.status(404);
                response.json({ message: 'The post with specified ID does not exist' })
            }
            response.json(post)
        })
        .catch(error => {
            response.status(500);
            response.json({ error: 'the Post could not be removed.' })
        })
    
});

// Update a Post by Id
server.put('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    let title = request.body.title;
    let contents = request.body.contents;
    let post = { title, contents };

    db
        .update(id, post)
        .then(post => {
            if (!title || !contents) {
                response.status(400);
                response.json({ errorMessage: 'Please provide title and contents.' })
            }
            response.status(200);
            response.json(post)
        })
        .catch(error => {            
            response.status(500);
            response.json({ error: 'the Post with the specified Id could not be modified.' })
        })
    
    
});



server.listen(5000, () => console.log('Listening!'))

