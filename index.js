// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();
const port = 8000;
// add your server code starting here

server.use(cors());
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.status(500).send({error: 'The posts information could not be retrieved.'}));
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if(!post) {
                return res.status(404).send({error: 'The post with the specified ID does not exist.'})
            }
            res.status(201).json(post);
        })
        .catch(err => res.status(500).send({error: 'The posts information could not be retrieved.'}));
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents ) {
        return res.status(400).send({errorMessage: 'Please provide title and contents for the post.'});
    }

    const newPost = { title, contents };
    db.insert(newPost)
        .then(postId => {
            const { id } = postId;
            db.findById(id)
                .then(post => {
                    if(!post) {
                        return res.status(422).json({Error: `Post does not exist by that id ${postId}`});
                    }
                    res.status(201).json(post);
                });
        })
        .catch(err => res.status(500).json({error: 'There was an error while saving the post to the database'}));
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents ) {
        return res.status(400).send({message: 'Please provide title and contents for the post.'});
    }

    const newPost = { title, contents };
    db.update(id, newPost)
        .then(post => {
            if(!post) {
                return res.status(404).send({message: 'The post with the specified ID does not exist.'});
            }
            res.status(200).json(post);
        })
        .catch(err => res.status(500).send({error: 'The post information could not be modified'}));
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(removedPost => {
            if(!removedPost) {
                return res.status(404).send({message: 'The post with the specified ID does not exist.'});
            }
            res.status(200).json(removedPost);
        })
        .catch(err => res.status(500).send({error: 'The post could not be removed'}));
})

server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));