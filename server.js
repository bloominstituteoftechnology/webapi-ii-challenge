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
    db.find()
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

// Put
// update: accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. 
// It returns the count of updated records. If the count is 1 it means the record was updated correctly.

server.listen(9000, () => console.log('API running on port 9000'))