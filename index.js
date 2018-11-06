// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');


const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.json('hello');
});

const sendErrorMsg = (msg, res) => {
    res.status(500);
    res.json({ Error: msg });
    return;
};

// get all posts

server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        }).catch(err => {
            res.status(500).json({ message: 'The posts information could not be retrieved.' });
        });
});

// get posts by id 

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(id => {
            if (id.length >= 1) {
                res.status(200).json(id);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The post with the specified ID does not exist.' });
        });
});


// update post

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(userId => {
            if (!req.body.title || !req.body.contents) {
                // res.status(200).json(message: `Y`)
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post' })
            } else if (!userId) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be modified." });
        });
});

// delete post

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(id => {
            if (id) {
                res.status(200).json({ message: 'Post has been removed' });
            } else {
                res.status(404).json({ message: 'the post with the specified ID does not exist' });
            }
        })
        .catch(err => {
            sendErrorMsg("The post could not be removed", res);
        });
});

// new post 

server.post('/api/posts', async (req, res) => {
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        const user = await db.findById(userId.id);
        res.status(201).json(user);
    } catch (error) {
        if (error) {
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post' })
        } else {
            res.status(500).json({ message: 'error creating user' });
        }
    };
});

// server listening on port

server.listen(9003, () => console.log('server is working'));

