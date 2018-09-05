// 200-299: success. 300-399: redirection. 400-499: client error. 500-599: server error

const express = require('express');

const db = require('./data/db.js')

const server = express();

// configure middleware for server
server.use(express.json()); //allows express to parse json info from req.body 

// configure routing

server.get('/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.error('error', err);

        res.status(500).json({error: "The posts information could not be retrieved." })
    })
})

server.post('/posts', async (req, res) => {
    const user = req.body; //requires express.json() middlware

    try {
        const response = await db.insert(user)
        res.status(201).json({ message: 'user created successfully' })
    } catch (ex) {
        res.status(500).json({ errorMessage: "Please provide title and contents for the post." })
    }

    // db.insert(user)
    // .then(response => res.status(201).json(response))
    // .catch(err => res.status(500).json(err))

})

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(count => { res.status(204).end() })
        .catch(err => res.status(500).json({ message: "The post with the specified ID does not exist." }))
})

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;

    db.update(id, req.body)
        .then(posts => { res.status(200).json(posts) })
        .catch(err => res.status(500).json({ message: "The post with the specified ID does not exist." }))
})

// start the server
server.listen(5000, () => console.log('API On Port 5000'));