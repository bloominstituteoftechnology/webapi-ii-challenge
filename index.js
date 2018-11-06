// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

//middleware
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved.",
            error: err
        }) 
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        if (!post.length) {
            console.log('fail', post)
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(post);
            console.log('success', post)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Cant get user',
            error: err
        })
    });
});

server.post('/api/posts', async (req, res) => {
    try {
        const user = await db.insert(req.body);
        res.status(201).json({message: 'user succesfully created', user})
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
            : res.status(404).json({message: 'user not found'})
    } catch(error) {
        res.status(500).json({message: 'error deleting post', error})
    }
})

server.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await db.update(id, req.body);
        count 
            ? res.status(200).json({message: `${count} users updated`})
            : res.status(404).json({message: 'user not found'})
    } catch(error) {
        res.status(500).json({message: 'error deleting post', error})
    }
})

server.listen(9000, () => console.log('\n== the server is alive! on port 9000 ==\n'));
