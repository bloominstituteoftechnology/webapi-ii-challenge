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
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
})

server.get('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getId = await db.findById(id)
        res.status(200).json(getId)
        if (getId === undefined) {
        res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({error: "The post information could not be retrieved. "})
    }
})

server.post('/api/posts', async (req, res) => {
    if (req.body.title === undefined || req.body.contents === undefined) {
        res.status(400).res.send({ errorMessage: "Please provide title and contents for the post."})
    }
    try {
        const post = await db.insert(req.body)
        res.status(201).json(post)
    } catch (err) {
        res.status(500).json({ error: "There was an error while saving the post to the database"})
    }
})

server.listen(8000);