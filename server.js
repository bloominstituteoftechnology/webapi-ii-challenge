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
    } catch {
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
})

server.get('/api/posts/:id', async (req, res) => {
    
})

server.listen(8000);