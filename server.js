// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here

// Post a Post 
server.post('/api/posts', (request, response) => {
    const id = request.params.id;
    let title = '';
    let contents = '';
    let post = { title, contents };

    db
    .insert(post)
    .then(post => {
        response.status(201);
        response.json(post);
    })
    .catch(error => {
        response.status(500);
        response.json({ error: 'There was an error posting to the database.' })
    })
    if (!title || !contents) {
        response.status(400);
        response.json({ errorMessage: 'Please provide title and contents.' })
    }
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
server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db
    .findById(id)
    .then(post => {
        response.json(post)
    })
    .catch(error => {
        response.status(500);
        response.json({ error: 'the Post information could not be found' })
    })
    if (id == null) {
        response.status(404);
        response.json({ message: 'The post with specified ID does not exist' })
    }
});

// Delete a Post by Id
server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db
    .remove(id)
    .then(post => {
        response.json(post)
    })
    .catch(error => {
        response.status(500);
        response.json({ error: 'the Post could not be removed.' })
    })
    if (!id) {
        response.status(404);
        response.json({ message: 'The post with specified ID does not exist' })
    }
});

// Update a Post by Id
server.put('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    let title = '';
    let contents = '';
    let post = { title, contents };

    db
    .update(id)
    .then(post => {
        response.status(200);
        response.json(post)
    })
    .catch(error => {
        response.status(500);
        response.json({ error: 'the Post with the specified Id could not be modified.' })
    })
    if (!id == null) {
        response.status(404);
        response.json({ message: 'The post with specified ID does not exist' })
    }
    if (!title || !contents ) {
        response.status(400);
        response.json({ errorMessage: 'Please provide title and contents.' })
    }
});



server.listen(5000, () => console.log('stuff'))

