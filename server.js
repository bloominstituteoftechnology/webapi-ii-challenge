// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();


server.use(express.json());
// add your server code starting here


server.get('/api/posts', (req, res) => {
    db.find().then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "No posts received."})
    )
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be gotten"})
    });
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents)
    res.status(400).json({ errorMessage: "Provide title AND contents"});
    db.insert({ title, contents })
    .then(posts => res.status(201).json(posts))
    .catch(err => res.status(400).json({ error: "Error saving post"}))
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(req.params.id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleteing post"})
    });
})

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents)
    res.status(400).json({ errorMessage: "Provide title And contents"});
    db.update(req.params.id, {title, contents})
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "ID dont exist fool"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "Error updating post"})
    });

})
    



server.listen(8000, () => console.log("API is running"));


