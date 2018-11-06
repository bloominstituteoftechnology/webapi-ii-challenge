// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

// middleware
server.use(express.json());
server.use(cors());

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({
            message: "The posts information could not be retrieved.",
            error: err
        }) 
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.findById(id);
        if (!post.length) {
            console.log('fail', post)
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(post);
            console.log('success', post)
        }
    } catch(error) {
        res.status(500).json({
            message: 'Cant get user',
            error: err
        })
    }
});

server.post('/api/posts', async (req, res) => {
    try {
        const post = req.body;
        if (!('title' in post) || !('contents' in post)) {
            res.status(400).json({message: 'Please provide title and contents for the post.'})
        } else {   
            const user = await db.insert(req.body);
            res.status(201).json({message: 'user succesfully created', user})
        }
    } catch(error) {
        res.status(500).json({message: 'error creating post', error})
    }
})

server.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await db.remove(id);
        count 
            ? res.status(200).json({message: `${count} users deleted`})
            : res.status(404).json({message:  'The post with the specified ID does not exist.'})
    } catch(error) {
        res.status(500).json({message: 'error deleting post', error})
    }
})

server.put('/api/posts/:id', async (req, res) => {
    try {
        const post = req.body;
        if (('title' in post) || ('contents' in post)) {
            const { id } = req.params;
            const count = await db.update(id, req.body);
            count 
                ? res.status(200).json({message: `${count} users updated`})
                : res.status(404).json({message: 'The post with the specified ID does not exist.'})
        } else {   
            res.status(400).json({message: 'Please provide title or contents for the post.'})
        }
    } catch(error) {
        res.status(500).json({message: 'The post information could not be modified.', error})
    }
})

server.listen(9000, () => console.log('\n== the server is alive! on port 9000 ==\n'));
