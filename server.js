// import your node modules
const express = require('express');
const helmet = require('helmet')
const db = require('./data/db.js');

const server = express();


// add your server code starting here
server.use(express.json());
server.use(helmet());


server.post('/api/posts', async (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) { return (res.status(400).json({ message: 'please fill out title and contents' })) }
    else {
        await db.insert(post)
        res.status(200).json(post)
    }
});

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'sorry we failed you', error: error });
    }

});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id) || null;
        res.status(200).json(post);
        if (post === null) {
            res.status(400).json({ message: 'NOT FOUND' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something happened', error: error })
    }
})

server.delete('/api/posts/:id', async (req, res) => {
    const post = parseInt(req.params.id);
    try {
        await db.remove(post);
        res.status(200).json({ message: 'Removed!' });
    } catch (error) {
        res.status(500).json({ message: 'Something happened', error: error });
    }
})

server.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if (!post.title || !post.contents) { return (res.status(400).json({ message: 'please fill out title and contents' })) }
    try {
        await db.update(id, post);
        res.status(200).json({ message: 'Changed' })
    } catch (error) {
        res.status(500).json({ message: 'something happened', error: error })
    }
});


server.listen(8000, () => console.log('API running on port 8000... *.*'));