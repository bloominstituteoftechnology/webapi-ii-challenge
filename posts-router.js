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

module.exports = router;