// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

server.listen(8000, () => console.log('API running . . .'));

// POST | Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if ( !title || !contents || title === '' || contents === '') {
        console.log("Error Code: ", 400, "Bad Response");
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }
    db
    .insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// GET | Returns an array of all the post objects contained in the database
// /api/posts
server.get('/api/posts', (req, res) => {
    const dbFind = db.find();

    dbFind
    .then( result => {
        const payload = result.map(item => {
            const {
                title, contents
            } = item;
        })
        return res.status(200).json(payload); 
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// GET | Returns the post object with the specified id.
// /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    res.status(200);
})

// DELETE | Removes the post with the specified id and returns the deleted post.
// /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if ( !id ) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    db.remove(id)
    .then(() => {
        res.status(200).json({ message: 'Post has been deleted.'});
    })
    .catch(() => {
        res.status(500).json({ error: "The post could not be removed." });
    })
})

// PUT | Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
// api/posts/:id
server.put('/api/posts/:id', (req, res) => {
    res.status(200);
})