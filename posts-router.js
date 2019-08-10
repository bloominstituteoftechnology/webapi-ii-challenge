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

module.exports = router;