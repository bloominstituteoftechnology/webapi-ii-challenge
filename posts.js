

//== Post Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');
const database = require('./data/db.js');

//-- Create route handler, then export -----------
const posts = express();
module.exports = posts;


//== Route Handlers ============================================================

//-- Get all Posts -------------------------------
posts.get('/', function (request, response, next) {
    // Retrieve all posts from database, then send to post
    database.find()
    .then(data => {
        response.status(200);
        response.json(data);
    })
    // Inform post of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The posts information could not be retrieved.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Get a Post by Id ----------------------------
posts.get('/:id', function (request, response, next) {
    // Attempt to find post-data in database
    const postId = request.params.id;
    database.findById(postId)
    .then(data => {
    // Inform the post if the requested data was not found
        if(!data){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
            return;
        }
    // Send the requested data
        response.status(200);
        response.json(data);
    })
    // Inform post of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The post information could not be retrieved.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Create a Post -------------------------------
posts.post('/', function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.title || !request.body.contents){
        response.status(400);
        response.json({
            errorMessage: "Please provide title and contents for the post."
        });
        response.next();
        return;
    }
    // Construct data from request
    let postData = {
        title   : request.body.title   ,
        contents: request.body.contents,
    };
    // Insert new post into database
    database.insert(postData)
    // Inform post of success
    .then(data => {
        return database.findById(data.id);
    })
    .then(postData => {
        response.status(201);
        response.json(postData);
    })
    // Inform post of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "There was an error while saving the post to the database."
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Delete a Post -------------------------------
posts.delete('/:id', function (request, response, next) {
    // Attempt to remove identified post from database
    const postId = request.params.id;
    database.remove(postId)
    // Handle situations where specified post does not exist
    .then(success => {
        if(!success){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
            return;
        }
    // Respond successfully
        response.status(204);
        response.end();
    })
    // Inform post of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The post could not be removed",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Update a Post -------------------------------
posts.put('/:id', function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.title || !request.body.contents){
        response.status(400);
        response.json({
            errorMessage: "Please provide a title and contents for the post."
        });
        response.next();
        return;
    }
    // Construct data from request
    let postData = {
        title   : request.body.title   ,
        contents: request.body.contents,
    };
    // Attempt to updated post data in database
    const postId = request.params.id;
    database.update(postId, postData)
    .then(success => {
    // Handle situations where specified post does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
            return;
        }
    // Inform of success
        return database.findById(postId);
    })
    .then(updatedPostData => {
        response.status(200);
        response.json(updatedPostData);
    })
    // Inform post of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The post information could not be modified.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});
