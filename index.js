// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');


const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.json('hello');
});

postsId = 10;

const sendErrorMsg = (msg, res) => {
    res.status(500);
    res.json({ Error: msg });
    return;
}


// get all posts

server.get('/api/posts', (req, res) => {
    db.find().then(users => {
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
                .json({ message: 'The post with the specified ID does not exist.' })
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

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    }

    db.insert({ title, contents })
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            sendErrorMsg({ error: 'There was an error while saving the post to the database' })
        });
});


// server listening on port


server.listen(9003, () => console.log('server is working'));

