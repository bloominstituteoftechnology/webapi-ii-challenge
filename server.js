// import your node modules
const express = require('express')
const db = require('./data/db.js');

// add your server code starting here
const server = express()
server.use(express.json())

server.get('/api/posts', async (req, res) => {

    try {
        const posts = await db.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})

server.get('/api/posts/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const getId = await db.findById(id)
        res.status(200).json(getId)
        if (getId.length === 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ error: "The post information could not be retrieved. " })
    }
})

server.post('/api/posts', async (req, res) => {

    try {
        const post = await db.insert(req.body)
        res.status(201).json(post)
        if (req.body.title === undefined || req.body.contents === undefined) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    } catch (err) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

server.delete('/api/posts/:id', async (req, res) => {

    try {
        const id = req.params.id
        const postDelete = await db.remove(id)
        res.status(200).json(postDelete)
        res.status(404).json({ message: "The post with the specified ID does not exist" })

    } catch (err) {
        res.status(500).json({ error: "The post could not be removed" })
    }
})

server.put('/api/posts/:id', async (req, res) => {
 
    try {
        const id = req.params.id
        const post = req.body
        const update = await db.update(id, post)
        if (update === 0) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
        }
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({ error: "The post information could not be modified." })
    }
})

server.listen(8000);