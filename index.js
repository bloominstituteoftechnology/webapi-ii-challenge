// import your node modules
const express = require('express')
const db = require('./data/db.js')

// add your server code starting here
const server = express()

server.use(express.json())

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            console.log(err, res.status(500).json({ error: 'The posts information could not be retrieved.' }))
        )
})

server.get('/api/posts/:id', (req, res) => {
    db
        .findById(req.params.id)
        .then(
            post =>
                post.length === 0
                    ? res.status(404).json({ message: 'The post could not be found' })
                    : res.status(200).json(post)
        )
        .catch(e => console.log(e, res.status(500).json({ error: 'The post information could not be retrieved.' })))
})

server.post('/api/posts', (req, res) => {
    if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('contents')) {
        res.status(400).json({ errorMessage: 'Pleae provide title and contents for the post.' })
    } else {
        Ï
        db
            .insert(req.body)
            .then(res.status(201).json(req.body))
            .catch(res.status(500).json({ error: 'There was an error while saving the post to the database.' }))
    }
})

server.delete('/api/posts/:id', (req, res) => {
    db
        .remove(req.params.id)
        .then(result => {
            result > 0 ? res.status(200).send('ok') : res.status(404).json({ message: 'ID NOT FOUND' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Cannot be removed' })
        })
})

server.put('/api/posts/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' })
    }

    db
        .update(req.params.id, req.body)
        .then(result => {
            result > 0 ? res.status(200).send('done') : res.status(404).json({ message: 'ID NOT FOUND' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'The post could not be modified' })
        })
})

server.listen(8000, () => console.log('Server is active on port 8000'))
