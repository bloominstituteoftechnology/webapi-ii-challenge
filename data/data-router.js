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

// router.post('/posts/:id/comments', (req, res) => {
//     const id = req.id
//     const comment = req.body
//     dataBase.insertComment(comment)
//     .then(post => {
//         if (id) {
//             res.json(post)
//         } else {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         }
//     })
// })

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
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
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
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})





module.exports = router;