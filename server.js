// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here

const server = express();

server.use(express.json());

//GET
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// POST
server.post('/api/posts', async (req, res) => {
    const post = req.body;
    try {
        const response = await db.insert(post);
        res.status(201).json(response);
    } catch (ex) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
});
// PUT
server.put('/api/posts/:id', (req, res) => {
    
})

// DELETE
server.post('/api/posts/:id', (req, res) => {
    
})

server.listen(9000, () => console.log('\== API on port NINE THOUSAND ==\n'));