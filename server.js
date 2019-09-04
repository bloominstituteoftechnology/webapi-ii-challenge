const db = require('./data/db');
const express = require('express');

const server = express();
server.use(express.json())

// sanity check 
server.get("/", (req, res) => {
    res.status(200).json({ api: "up..." });
  });

// 	Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json( {error: "The posts information could not be retrieved."} )
    })
})

// Creates a post using the information sent inside the request body.
// Sends back an id object
server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    const { title, contents } = req.body;
    if (title && contents){
        db.insert(newPost)
        .then((idObj) => {
            db.findById(idObj.id)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({message: 'Error getting new post'})
            })
        })
        .catch((error) => {
            res.status(500).json( {error: "There was an error while saving the post to the database"} )
        })
    } else {
        res.status(400).json( {errorMessage: 'Please provide title and contents for the post.'})
    }
})


// Returns the post object with the specified id.
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length > 0){
            res.status(200).json(response)
        } else {
            res.status(404).json( {message: "The post with the specified ID does not exist."} ) 
        }
    })
    .catch((error) => {
        res.status(500).json( {error: "The post information could not be retrieved." } )
    })
})

// 	Updates the postwith the specified id using data from the request body.
//  Returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body
    if (updatedPost.title && updatedPost.contents){
        db.findById(id)
        .then((response) => {
            if (response.length == 0){
                res.status(404).json( {message: "The post with the specified ID does not exist."} ) 
            }
            return response;
        })
        db.update(id, updatedPost)
        .then((response) => {
            res.status(201).json(updatedPost)
        })
        .catch((error) => {
            res.status(500).json( {error: "The post information could not be modified." } )
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})


// Removes the post with the specified id and returns the deleted post object. 
// You may need to make additional calls to the database in order to satisfy this requirement.
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(404).json( { message: "The post with the specified ID does not exist."} ) 
        }
        return response;
    })
    .then((response) => {
        db.remove(id)
        .then(() => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json( {error: "The post could not be removed"} )
        })
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error finding that post'} )
    })
})

// Returns an array of all the comment objects associated with the post with the specified id.
server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(404).json( { message: "The post with the specified ID does not exist."} ) 
        }
        return response;
    })
    .then(
        db.findPostComments(id)
        .then((response) => {
            if (response.length > 0){
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'No comments found for this post'});
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
    )
})

// Creates a comment for the post with the specified id using information sent inside of the request body.
server.post('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    if(req.body.text){
        db.findById(id)
        .then((response) => {
            if (response.length == 0){
                res.status(404).json( {message: "The post with the specified ID does not exist."} ) 
            }
            return response;
        })
        .then(
            db.insertComment(newComment)
            .then((idObj) => {
                db.findCommentById(idObj.id)
                .then(response => {
                    res.status(201).json(response);
                })
                .catch(error => {
                    res.status(500).json({message:"Error getting new comment"})
                })
            })
            .catch((error) => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        )
    } else {
        res.status(400).json({errorMessage: "Please provide text for the comment." })
    }
})

module.exports = server;
