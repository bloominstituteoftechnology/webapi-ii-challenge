const express = require('express')
const dataBase = require('./db')

const router = express.Router();

router.post('/posts', (req, res) => {
    const post = req.body
    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        dataBase.insert(post)
        .then(posts => {
            res.status(201);
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

router.post('/posts/:id/comments', (req, res) => {
    const newComment = req.body
    if (!newComment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        dataBase
        .insertComment(newComment)
        .then(post => {
                res.status(201).json(post);
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
})

router.get('/posts', (req, res) => {
    dataBase.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    dataBase
    .findById(id)
    .then(post => {
        if (!post[0]) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.json(post)
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/posts/:id/comments', (req, res) => { 
    const id = req.params.id
    dataBase
    .findPostComments(id)
    .then(post => {
        if (post[0]) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    dataBase
    .remove(id)
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if (!updates.title || !updates.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } 
    else {
        dataBase.update(id, updates)
        .then(update => {
            if (update) {
                res.status(200).json(update)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})





module.exports = router;