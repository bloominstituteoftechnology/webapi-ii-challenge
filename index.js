const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors({origin: 'http://localhost:3000'}));

// ***** GET request to /api/posts: *****
// If there's an error in retrieving the posts from the database:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The posts information could not be retrieved." }

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

// ***** GET request to /api/posts/:id *****
// If the post with the specified id is not found:
// - return HTTP status code 404 (Not Found).
// - return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The post information could not be retrieved." }.

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post.length) {
                res.json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// ***** POST request to /api/posts *****
// If the request body is missing the title or contents property:
// - cancel the request.
// - respond with HTTP status code 400 (Bad Request).
// - return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If the information about the post is valid:
// - save the new post the the database.
// - return HTTP status code 201 (Created).
// - return the newly created post.
// If there's an error while saving the post:
// - cancel the request.
// - respond with HTTP status code 500 (Server Error).
// - return the following JSON object: { error: "There was an error while saving the post to the database" }.
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    if (newPost.title && newPost.contents) {
        db.insert(newPost)
            .then(post => {
                return db.findById(Number(post.id));
            })
            .then(foundPost => {
                res.status(201).json(foundPost[0]);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

// ***** DELETE request to /api/posts/:id *****
// If the post with the specified id is not found:
// - return HTTP status code 404 (Not Found).
// - return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in removing the post from the database:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The post could not be removed" }.
server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(recordsDeleted => {
            if(recordsDeleted) {
                res.status(200).json({ message: `Record with ID ${req.params.id} deleted.`});
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
        });
})

// ***** PUT request to /api/posts/:id *****
// If the post with the specified id is not found:
// - return HTTP status code 404 (Not Found).
// - return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:
// - cancel the request.
// - respond with HTTP status code 400 (Bad Request).
// - return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:
// - update the post document in the database using the new information sent in the reques body.
// - return HTTP status code 200 (OK).
// - return the newly updated post.
server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    const updatedPost = { title, contents };

    if(updatedPost.title && updatedPost.contents){
        db.update(req.params.id, updatedPost)
            .then(recordsUpdated => {
                if(recordsUpdated){
                    return db.findById(Number(req.params.id));
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                }
            })
            .then(updatedPost => {
                res.status(200).json(updatedPost[0]);
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." });
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

server.listen(9000);