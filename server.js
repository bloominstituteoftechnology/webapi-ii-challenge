// import your node modules
const express = require('express')
const server = express()
const db = require('./data/db')
const cors = require('cors')

// add your server code starting here
server.use(cors())
server.use(express.json())

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
    if (title === undefined || contents === undefined) {
        res.status(400).json("BAD REQUEST")
    } else {
        db
            .insert({ title, contents })
            .then(response => {
                db.findById(response.id)
                    .then(post => {
                        res.json(post)
                    })
                    .catch(error => {
                        res.json(error)
                    })
            })
            .catch(error => {
                res.json({ error: "There was an error while saving the post to the database" })
            })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "YOU WILL NOT FIND THIS IN HERE! " })
            } else {
                db.remove(id)
                    .then(count => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.stats(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            res.stats(500).json({ error: "The post information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    db
        .findById(id)
        .then(result => {
            if (result.length === 1) {
                res.json(result)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body
    const id = req.params.id
    db
        .update(id, { title, contents })
        .then(result => {
            if (result.length === 1) {
                db
                    .findById(id)
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.json(error)
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})


server.listen(5000, () => console.log('server running on port 5000'))