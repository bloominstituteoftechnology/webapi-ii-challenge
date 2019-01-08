// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/posts',  (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).res.json({ error: 'The posts information could not be retrieved'})
        })
})

server.get('/api/posts/:id',  (req, res) => {
    const id = req.params.id;
    
    db.findById(id)
        .then(post => {
            if(post.length) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be retrieved'})
        })
});

server.post('/api/posts',  (req, res) => {
    const postInfo = req.body;
    
    db.insert(postInfo)
        .then( result => {
            db.findById(result.id)
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => res.status(500).json({ message: 'The post ID failed', error: err}))
                res.status(201).json(result)
        })
        .catch(err => res.status(500).json({ message: 'The post failed', error: err}))
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if(user) {
                db.remove(id).then(count => {
                    res.status(200).json(user);
                });
            } else {
                res
                    .status(404)
                    .json({ message: 'User with the specified ID does not exist'})
            }
        })
        .catch(err => res.status(500).json(err))
})

server.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    try {
        const result = await db.update(id, changes);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

server.listen(5000, () => console.log('server is running'))

// add your server code starting here
