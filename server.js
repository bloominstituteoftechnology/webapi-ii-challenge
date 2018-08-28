// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// configure middleware
server.use(express.json());

// configure routing    
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body; 
    if (!title || !contents) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
    } else {
        db.insert({title, contents})
            .then(() => {
                res.status(201);
                res.json({title, contents})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'There was an error while saving the post to the database.'});
            })
    }
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({error: 'The posts information could not be retrieved.'});
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'The post information could not be retrieved.'});
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            console.log("count from delete", count);
            if (count === 1) {
                res.status(200).json({message: 'The post was successfully deleted.'});
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'The post could not be removed.'});
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
    } else { 
        db.update(id, ({title, contents}))
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'})
            }
        })
        .catch(err => {
            res.status(500).json({error: 'The post information could not be modified.'})
        })
    }
})

// start the server
server.listen(5000, () => console.log('\n=== API on port 5000 ===\n'));