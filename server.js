// import your node modules
const express = require('express'); // import express from 'express'

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

// Post
// insert: calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: { id: 123 }.

// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If the information about the post is valid:
// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.

// If there's an error while saving the post:
// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.
server.post('/posts', async (req, res) => {
    const post = req.body; // requires the express.json() middleware
    if(post.title && post.contents){
        try {
            const response = await db.insert(post);
            res.status(201).json(response);
        }
        catch(ex){
            // handle error
            res.status(500).json({ error: 'There was an error while saving the post to the database' })
        }
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    }
})

// Get
// find: calling find returns a promise that resolves to an array of all the posts contained in the database.
// findById: this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.

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
server.get('/', (req, res) => {
    res.send('Home Page');
})

server.get('/posts', (req, res) => {
    db.find()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    })
})

server.get('/posts/:id', (req, res) => {
    db.findbyId()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
})

// Delete 
// remove: the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If there's an error in removing the post from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(post => {
            console.log('post: ', post)
            if(post) {
                res.status(204).end()
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ error: 'The post could not be removed' }))
})

// Put
// update: accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. 
// It returns the count of updated records. If the count is 1 it means the record was updated correctly.

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If there's an error when updating the post:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.

// If the post is found and the new information is valid:
// update the post document in the database using the new information sent in the reques body.
// return HTTP status code 200 (OK).
// return the newly updated post.
server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if(!post.title || !post.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    }
    db.update(id, post)
        .then(post => {
            if(post){
                res.status(200).json(post)
            }
            else{
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => res.status(500).json({ message: "The post information could not be modified"}))
})

server.listen(9000, () => console.log('API running on port 9000'))