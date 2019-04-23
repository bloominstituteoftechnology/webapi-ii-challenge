const express = require('express');
const Posts = require('../db.js');
const router = express.Router();

// Get. **Postman Tested: working**
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The posts information could not be retrieved"})
    }
});

// Get by ID. **Postman Tested: working**
router.get('/:id', async (req, res) => {
    try {
        const posts = await Posts.findById(req.params.id);
        
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(400).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "The post information could not be retrieved"})
    }
});

// Post. **Postman Tested: **
router.post('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        const { title, contents } = req.body;
        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post."})
        }

        posts
        .insert({ title, contents })
        .then(post => {
            res.status(201).json(post)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error while saving the post to the database."})
    }
});

// Delete. **Postman Tested: **

// Put. **Postman Tested: **

module.exports = router;