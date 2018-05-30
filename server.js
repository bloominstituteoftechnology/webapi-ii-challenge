const express = require('express');
const db = require('./data/db.js');
const port = 5000;

const server = express();
server.use(express.json());

// server code here
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    db
        .insert({ title, contents })
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
})




server.listen(port, () => console.log(`Magic Happening on port ${port}`))