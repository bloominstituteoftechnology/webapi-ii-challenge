// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find().then(post => {
        res.json(post)})
        .catch(err => {
            res.status(500).json({ message: "we failed"})
        });
});
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        if(post) {
            res.status(200).json(post)
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
        res.status(500).json({ error: "There was an error while saving the post to the database"})
    }
});
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(count => {
        if (count) {
            res.status(200).json(count);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed."});
    })
});
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const postData = req.body;
    db.update(id, postData).then(count => {
        if(count) { 
            res.status(200).json(count)}
         else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
         }}).catch( err => {
        res.status(500).json({ message: "Unable to update"});
    })
});

server.listen(8000, () => 
console.log('Server is running at port 8000')
);


// add your server code starting here
