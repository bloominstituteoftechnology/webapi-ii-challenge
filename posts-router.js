const express = require('express');

const Posts = require('./data/db');

const router = express.Router();
// URI: /api/posts

// Get request to get a list of the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json(posts);
    } catch {
        res.status(500).json({
            message: 'The posts information could not be retrieved.'
        })
    }
})

// get a specific post by Id.
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        console.log(post);
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }
    } catch {
        res.status(500).json({
            message: 'The post information could not be retrieved.'
        })
    }
})

// create a new post
router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: 'Please provide a title and contents for the post.'
        })
    } else {
        try {
            const post = await Posts.insert(req.body);
            try {
                const find = await Posts.findById(post.id)
                res.status(201).json(find)
            } catch {
                res.status(500).json({
                    message: 'error in displaying newly create post.'
                })
            }
        } catch {
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            })
        }
    }
})

// Put request to update a post
router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: 'Please provide a title and contents for the post.'
        })
    } else {
        try {
            const post = await Posts.update(req.params.id, req.body)
            if (post > 0) {
                try {
                const find = await Posts.findById(req.params.id)
                res.status(200).json(find)
                } catch {
                res.status(500).json({
                    message: 'error in displaying newly create post.'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
            }
        } catch{
            res.status(500).json({
                message: 'The post information could not be modified.'
            })
        }
    }
})

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const remove = await Posts.remove(req.params.id);
        if (remove > 0) {
            res.status(200).json({
                message: 'The post has been deleted.'
            })
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    } catch {
        res.status(500).json({
            error: 'The post could not be removed'
        })
    }
})

//Get the comments from a specific post by Id.
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.params.id)
        try {
            const post = await Posts.findById(req.params.id);
            console.log(post);
            if (post.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
            }
        } catch {
            res.status(500).json({
                message: 'The post information could not be retrieved.'
            })
        }
    } catch {
        res.status(500).json({
            error: 'The comments information could not be retrieved.'
        })
    }
})

module.exports = router;