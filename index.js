// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// server.use(express.jason());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).res.json({ error: 'The posts information could not be retrieved'})
        })
})

server.get('/api/posts/:id', async (req, res) => {
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

// server.post('api/posts', (req, res) => {
//     console.log('body', req.body)
//     try {
//         const userData = req.body;
//         const postID = await db.insert(userData)
//         res.status(201).json(postID)
//     } catch (error) {
//         res.status(500).json({ message: 'error creating user', error})
//     }
    
// })

server.listen(5000, () => console.log('server is running'))

// add your server code starting here
