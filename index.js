// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find().then(user => {
        res.json(user)})
        .catch(err => {
            res.status(500).json({ message: "we failed"})
        });
});
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "No user found"})
        }
    }).catch(err => {
        res.status(500).json({ message: "data not found"})
    });
});
server.post('/api/posts', async (req, res) => {
    try {
        const userData = req.body;
        const user = await db.insert(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "error creating the user"})
    }
});

server.listen(8000, () => 
console.log('Server is running at port 8000')
);


// add your server code starting here
