const express = require('express')

const db = require('./db')

const router = express.Router()

// GET Post
router.get('/', async (req, res) => {
    try {
        const posts = await db.find(req.query)
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error retrieving posts'
        })
    }
})

// GET Post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ errorMessage: 'Post not found...' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error retrieving the post.'
        })
    }
})

// ADD Post
router.post('/', async (req, res) => {
    try {
        const body = req.body
        await db.insert(body)
            .then(postRes => {
                if (body.title && body.contents) {
                    res.status(201).json(postRes)
                } else {
                    res.status(400).json({
                        errorMessage: 'Please provide a title and contents.'
                    })
                }
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error adding your post'
        })
    }
})

// DELETE Post
router.delete('/:id', async (req, res) => {
    try {
        const pop = await db.remove(req.params.id)
        if (pop > 0) {
            res.status(200).json({
                message: 'Post has been successfully destroyed.'
            })
        } else {
            res.status(404).json({ errorMessage: 'Post not found...' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error removing the post.'
        })
    }
})

// UPDATE Post
router.put('/:id', async (req, res) => {
    try {
        const post = await db.update(req.params.id, req.body)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ errorMessage: 'Post not found...' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error updating the post.'
        })
    }
})

// GET Comments by post ID
router.get('/:id/comments', async (req, res) => {
    try {
        const comment = await db.findPostComments(req.params.id)
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({
                success: false,
                errorMessage: 'Comment was not found...'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error removing the comment.'
        })
    }
})

// ADD Comment to post
router.post('/:id/comments', async (req, res) => {
    try {
        await db.findById(req.params.id)
            .then(found => {
                if (found && found.length) {
                    db.insertComment({ 
                        text: req.body.text, postId: req.params.id 
                    })
                        .then(commentRes => {
                            if (req.body.text) {
                                res.status(201).json(commentRes)
                            } else {
                                res.status(400).json({
                                    errorMessage: 'Please provide text for your comment.'
                                })
                            }
                        })
                } else {
                    res.status(404).json({
                        errorMessage: 'Post with this ID doesn\'t exist'
                    })
                }
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: 'Error removing the comment.'
        })
    }
})

module.exports = router