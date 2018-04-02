const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts)
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        req.abort()
        return res.status(400).json({ errorMessage: 'Please provide title and contents for post'});
    }

    db
    .insert(post)
    .then(post => {
        res.json(post)
        return res.status(201).json({ Created});
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});




const port = 5000;
server.listen(port, () => {
    console.log('Server running on port 5000');
})
