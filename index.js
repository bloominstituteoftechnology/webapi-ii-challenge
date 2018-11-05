// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express')
const server = express()

server.get('/', (req, res) => {
 res.json({message: 'No content here, please see /api/posts to begin'})
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({error: 'The posts information could not be received.'})
    })
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        if (post && post.length) {
            return res.status(200).json(post)
        } else {
           return res.status(404).json({message: 'The post with the specified ID does not exist'})
        }

        // console.log(URLid.id)
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved.'})
    })
})








////
server.listen(9000, () => console.log('Server listening at port 9000'))
