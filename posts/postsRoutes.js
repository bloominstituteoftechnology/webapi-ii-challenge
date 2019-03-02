const express = require('express');
const db = require('./../data/db.js');
const router = express.Router();

router.get('/', async (req, res) => {

    const posts = await db.find(req.query);

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(400).json('There are no available posts')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.post('/', async (req, res) => {

    const newPost = req.body;
    const post = await db.insert(newPost);

    try {
        if (newPost) {
            res.status(201).json('Item added');    
        }
        else {
            res.json('Please enter both the title and contents');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:id', async (req, res) => {

    const post = await db.findById(req.params.id);
    
    try {

        if (post.length > 0) {
            res.status(200).json(post);
        }
        else {
            res.status(400).json('This post is unavailable');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const removed = await db.remove(id);
    try {
        if (removed) {
            res.status(200).json('Item removed')
        }
        else {
            res.status(400).json('Post unavailable.')
        }
    } 
    catch (e) {
        res.status(500).json(e);
    }
})



module.exports = router;