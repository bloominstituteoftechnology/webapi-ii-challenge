// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('Server running...');
});

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({error: 'The posts information could not be retrieved.'});
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await db.findById(id);
        if(post[0]) {
            res.status(200).json(post[0]);
        } else {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post information could not be retrieved.'});
    }
});

server.post('/api/posts', async (req, res) => {
    try {
        const post = {...req.body};
        if(!post.title || !post.contents) {
            res.status(400).json({error: 'Please provide title and contents for the post.'});
        } else {
            const newPost = await db.insert(post);
            res.status(201).json(post);
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error while saving the post to the database.'});
    }
});

server.delete('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await db.findById(id);
        if(post[0]) {
            const delPost = await db.remove(id);
            res.status(200).json(post[0]);
        } else {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post could not be removed.'});
    }
});

server.put('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = req.body;
        let findPost = await db.findById(id);
        if(findPost[0] && (post.title && post.contents)) {
            const updatePost = await db.update(id, post);
            findPost = await db.findById(id);
            res.status(200).json(findPost[0]);
        } else if (!findPost[0]) {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        } else {
            res.status(400).json({error: 'Please provide title and contents for the user.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post information could not be modified.'});
    }
});

server.listen(8000, () => console.log('Server running...'));
