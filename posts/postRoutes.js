const express = require('express')
const router = express.Router()
const db = require('../data/db')

//C
router.post('/', (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents)
        res.status(400)
            .json({errorMessage: "Please provide title and contents for the post."})
    const now = new Date().toISOString()
    db.insert({title, contents, created_at: now, updated_at: now})
        .then(response => res.status(201)
            .json(response))
        .catch(err => res.status(500)
            .json({error: "There was an error while saving the post to the database"}))
})
//R
router.get('/', (req, res) => {
    db.find()
        .then(posts => res.status(201)
            .json(posts))
        .catch(err => res.status(500)
            .json({error: "The posts information could not be retrieved."}))
})
router.get('/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)
        .then(post =>
            post.length > 0
            ?   res.status(200)
                    .json(post)
            :   res.status(404)
                    .json({ message: "The post with the specified ID does not exist." }))
        .catch(err => res.status(500)
            .json({error: "The post information could not be retrieved."}))
})
//U
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, contents, created_at} = req.body
    if(!id)
        res.status(404)
            .json({message: "The post with the specified ID does not exist."})
    if(!title || !contents)
        res.status(400)
            .json({errorMessage: "Please provide title and contents for the post."})
    const now = new Date().toISOString()
    const updatedPost = {title, contents, created_at, updated_at: now}
    db.update(id, updatedPost)
        .then(response =>
            response
            ? res.status(200)
                .json(response)
            : res.status(404)
                .json({message: "The post with the specified ID does not exist."}))
        .catch(err => res.status(500)
            .json({error: "The post information could not be modified."}))
})
//D
router.delete('/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
        .then(post =>
            post
            ?   res.status(200)
                    .json(post)
            :   res.status(404)
                    .json({message: "The post with the specified ID does not exist."}))
        .catch(err => res.status(500)
            .json({error: "The post could not be removed"}))
})

module.exports = router