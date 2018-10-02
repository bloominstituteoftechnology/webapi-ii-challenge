// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(cors());

server.get('/', (req, res) => {
    res.send('Nothing here...')
});

// ~~~ Post Schema ~~~ 
// {
//     "title": "The post title", // String, required
//     "contents": "The post contents" // String, required
// }
// ~~~~~~~~~~~~~~~~~~~~ //


// find(): calling find returns a promise that resolves to an array of all the posts contained in the database.
// GET	"/api/posts"	Returns an array of all the post objects contained in the database.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// When the client makes a GET request to /api/posts:

// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.
server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            console.error(`Error: ${err}.`);
            res.status(500).json({ "error": "The posts information could not be retrieved." }) 
        });
});


// findById(): this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
// GET	"/api/posts/:id"	Returns the post object with the specified id.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.
server.get('/api/posts/:id', (res, req) => {
    const { id } = req.params;
    db.findById(id)
        .then((singlePost) => {
            if(singlePost.length !== 0) {
                res.status(200).json(singlePost);
            } else {
                console.error(`Error retrieving by ID: ${id}. Post not found.`)
                res.status(404).json({ "message": "The post with the specified ID does not exist." });
            }
        })
        .catch((err) => {
            console.error(`DB error: ${err}.`);
            res.status(500).json({ "error": "The post information could not be retrieved." });
        });
});


// insert(): calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: { id: 123 }.
// POST	"/api/posts"	Creates a post using the information sent inside the request body.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// When the client makes a POST request to /api/posts:

// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If the information about the post is valid:

// save the new post to the database.
// return HTTP status code 201 (Created).
// return the newly created post.
// If there's an error while saving the post:

// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(title && contents) {
        const newPost = {title, contents};
        db.insert(newPost)
            .then((postId) => {
                db.findById(postId)
                    .then((returnedPost) => {
                        res.status(201).json(returnedPost);
                    })
                    .catch((err) => {
                        console.error(`Error retrieving edited post from DB: ${err}.`)
                        res.status(500).json({ "error": "There was an error while retrieving the saved post from the database." });
                    });
            })
            .catch((err) => {
                console.error(`Error editing post ID: ${postId}. Error: ${err}.`);
                res.status(500).json({ "error": "There was an error while saving the post to the database." });
            });
    } else {
        res.status(400).json({ "errorMessage": "Please provide title and contents for the post." });
    }
});


// remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// DELETE	"/api/posts/:id"	Removes the post with the specified id and returns the deleted post.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// When the client makes a DELETE request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in removing the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then((numDeleted) => {
            if(numDeleted !== 0) {
                // https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete
                res.status(204);
            } else {
                res.status(404).json({ "message": "The post with the specified ID does not exist." });
            }
        })
        .catch((err) => {
            console.error(`Error: ${err}.`)
            res.status(500).json({ "error": "The post could not be removed." });
        });
});


// update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// PUT	"/api/posts/:id"	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// When the client makes a PUT request to /api/posts/:id:

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

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if(title && contents) {
        db.findById(id)
            .then((foundPost) => {
                if(!foundPost.isArray) {
                    const updatingPost = { title, contents };
                    db.update(id, updatingPost)
                        .then((updatedCount) => {
                            if(updatedCount !== 0) {
                                db.findById(id)
                                    .then((updatedPost) => {
                                        res.status(200).json(updatedPost);
                                    })
                                    .catch((err) => {
                                        console.error(`Error: ${err}`);
                                        res.status(500).json({ "errorMessage": "It appears the post disappeared sometime after the update, but before the subsequent fetch and send. Sorry. :("});
                                    });
                            } else {
                                res.status(500).json({"errorMessage": "That's odd... The post is there, and the data you sent appears good at first glance, but the DB didn't handle the update properly. Maybe try again and see what happens?"})
                            }
                        })
                        .catch((err) => {
                            console.error(`Couldn't update the post.`)
                            res.status(500).json({ "error": "The post information could not be modified." });
                        });
                } else {
                    res.status(404).json({ "message": "The post with the specified ID does not exist." });
                }
            })
            .catch((err) => {
                console.error(`Error while accessing the database: ${err}.`)
                res.status(500).json({ "errorMessage": `Error while accessing the database: ${err}.`});
            });
    } else {
        console.error(`Title or Contents missing from POST: ${err}.`)
        res.status(400).json({ "errorMessage": "Please provide title and contents for the post." });
    }
    
});


const port = 9001;
server.listen(port, () => console.log(`\n~~~ API running on port ${port} ~~~\n`));
