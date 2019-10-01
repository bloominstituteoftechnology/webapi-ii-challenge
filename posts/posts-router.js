const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            })
        }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                })
            })
        }
})

router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {    
        Posts.findById(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be retrieved"
                })
            })
    }
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ message: "The comments with the specified ID does not exist." })
    } else {    
        Posts.findById(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "The comments information could not be retrieved"
                })
            })
    }
})

router.delete('/:id', (req, res) => {
        Posts.remove(req.params.id)
        .then(post => {
            if (!req.params.id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
              } else {
            res.status(200).json({ message: 'The post has been destroyed' })
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post could not be removed" });
      });
    }
);

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {    
        Posts.update(id, changes)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be modified."
                })
            })
    }
})
module.exports = router;

// *** When the client makes a POST request to /api/posts:

// --- If the request body is missing the title or contents property: ---
// x cancel the request.
// x respond with HTTP status code 400 (Bad Request).
// x return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// --- If the information about the post is valid: ---
// x save the new post the the database.
// x return HTTP status code 201 (Created).
// x return the newly created post.

// --- If there's an error while saving the post: ---
// x cancel the request.
// x respond with HTTP status code 500 (Server Error).
// x return the following JSON object: { error: "There was an error while saving the post to the database" }.


// ***** When the client makes a POST request to /api/posts/:id/comments:

// --- If the post with the specified id is not found: ---
// x return HTTP status code 404 (Not Found).
// x return the following JSON object: { message: "The post with the specified ID does not exist." }.

// --- If the request body is missing the text property: ---
// x cancel the request.
// x respond with HTTP status code 400 (Bad Request).
// x return the following JSON response: { errorMessage: "Please provide text for the comment." }.

// --- If the information about the comment is valid: ---
// x save the new comment the the database.
// x return HTTP status code 201 (Created).
// x return the newly created comment.

// --- If there's an error while saving the comment: ---
// x cancel the request.
// x respond with HTTP status code 500 (Server Error).
// x return the following JSON object: { error: "There was an error while saving the comment to the database" }.


// ***** When the client makes a GET request to /api/posts: *****

// --- If there's an error in retrieving the posts from the database: ---
// x cancel the request.
// x respond with HTTP status code 500.
// x return the following JSON object: { error: "The posts information could not be retrieved." }.


// ***** When the client makes a GET request to /api/posts/:id: *****

// --- If the post with the specified id is not found: ---
// x return HTTP status code 404 (Not Found).
// x return the following JSON object: { message: "The post with the specified ID does not exist." }.

// --- If there's an error in retrieving the post from the database: ---
// x cancel the request.
// x respond with HTTP status code 500.
// x return the following JSON object: { error: "The post information could not be retrieved." }.


// ***** When the client makes a GET request to /api/posts/:id/comments: *****

// --- If the post with the specified id is not found: ---
// x return HTTP status code 404 (Not Found).
// x return the following JSON object: { message: "The post with the specified ID does not exist." }.

// --- If there's an error in retrieving the comments from the database: ---
// x cancel the request.
// x respond with HTTP status code 500.
// x return the following JSON object: { error: "The comments information could not be retrieved." }.


// ***** When the client makes a DELETE request to /api/posts/:id: *****

// --- If the post with the specified id is not found: ---
// x return HTTP status code 404 (Not Found).
// x return the following JSON object: { message: "The post with the specified ID does not exist." }.

// --- If there's an error in removing the post from the database: ---
// x cancel the request.
// x respond with HTTP status code 500.
// x return the following JSON object: { error: "The post could not be removed" }.


// ***** When the client makes a PUT request to /api/posts/:id: *****

// --- If the post with the specified id is not found: ---
// x return HTTP status code 404 (Not Found).
// x return the following JSON object: { message: "The post with the specified ID does not exist." }.

// --- If the request body is missing the title or contents property: ---
// x cancel the request.
// x respond with HTTP status code 400 (Bad Request).
// x return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// --- If there's an error when updating the post: ---
// x cancel the request.
// x respond with HTTP status code 500.
// x return the following JSON object: { error: "The post information could not be modified." }.

// --- If the post is found and the new information is valid: ---
// x update the post document in the database using the new information sent in the request body.
// x return HTTP status code 200 (OK).
// x return the newly updated post.