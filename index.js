// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'The posts information could not be retrieved.'})
        });
   
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({message: `Couldn't find post ${id}`});
        });
});

server.post('/api/posts', async (req, res) => {
    try {
        const postData = req.body;
        const postId = await db.insert(postData);
        const post = await db.findById(postId.id);
        res.status(201).json(post);
    } catch(error) {
        res.status(500).json({ message: error})
    }

});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changedPost = req.body;
    db.update(id, changedPost)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} posts updated`});
            } else {
                res.status(404).json({ message: 'post not found'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating the post'});
        });
});

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting post'});
        });
});


server.listen(8000, () => console.log('API running on port 8000'));





