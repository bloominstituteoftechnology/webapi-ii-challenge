const express = require('express');

const Posts = require('./data/db.js');

const router = express.Router();





// Returns an array of all the post objects contained in the database.
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req);
        res.status().json(posts);
    }
    catch(err) {
        res.status(500).json({
            err:err,
            message: 'The posts information could not be retrieved.'
        })
    }
});

// Returns the post object with the specified id.
router.get('/:id', async (req, res) => {
    try {
        const posts = await Posts.findById(req.params.id);
        // res.status().json(posts);

        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message:'The post information could not be retrieved.'
        })
    }
});

// Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.params.id);
        // res.status(200).json(comments);

        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'The comments information could not be retrieved.'
        })
    }
});

// Creates a post using the information sent inside the request body.
router.post('/', async (req, res) => {
    const {title, contents} = req.body;

    try {
        if(req.body) {
            const post = await Posts.insert(req.body)
            res.status(201).json(post)
        } else {
            res.status(400).json({
                message: 'Please provide title and contents for the post.'
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
});

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', async (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    
    if(id) {
        try {
            const comment = await Posts.insertComment(req.body);
            if(req.body) {
                res.status(201).json(comment)
            } else {
                res.status(400).json({
                    message: 'Please provide text for the comment.'
                })
            }

        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the comment to the database'
            })
        }
    } else {
        res.status(404).json({
            message: 'The post with the specified ID does not exist.'
        })
    }
});

// Removes the post with the specified id and returns the deleted post object.
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedPost = await Posts.remove(id);

        if(deletedPost) {
            res.status(200).json(deletedPost)
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'The post could not be removed'
        })
    }
});

// Updates the post with the specified id using data from the request body.
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;

    if(id) {
        try {
            const post = await Posts.update(req.body);
            if(req.body) {
                res.status(200).json(post)
            } else {
                res.status(400).json({
                    message: 'Please provide title and contents for the post.'
                })
            }

        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                message: 'The post information could not be modified.'
            })
        }
    } else {
        res.status(404).json({
            message: 'The post with the specified ID does not exist.'
        })
    }
});