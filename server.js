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
            res.json(error)
        })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
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
            res.json(error)
        })
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
                        res.json(error)
                    })
            }
        })
        .catch(error => {
            res.json(error)
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    db
        .findById(id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { title, content } = req.body
    db
        .update(params.id, { title, content })
        .then(result => {
            db
                .findById(id)
                .then(result => {
                    res.json(result)
                })
                .catch(error => {
                    res.json(error)
                })
        })
        .catch(error => {
            res.json(error)
        })
})


server.listen(5000, () => console.log('server running on port 5000'))