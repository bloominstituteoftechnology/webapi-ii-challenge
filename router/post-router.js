const express = require('express')

const db = require('./data/db.js')

const router = express.Router()

//Post request to /api/post 
server.post('/', (req, res) => {
    const newPost = req.body;
    const { title, contents} = req.body;
    
    if(!title || !contents) {
        res.status(201).json({ error: 'Must have Title and Contents to submit.'})
    } else {
        db.insert(newPost)
            .then(post => {
                res.status(201).json({ post })
            })
            .catch(err => {
                res.status(500).json({ err: 'Could not save this post.'})
            })
    }
})

module.exports = router;

