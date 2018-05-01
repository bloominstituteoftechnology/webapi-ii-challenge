// import your node modules
const express = require('express');
// yarn add helmet -> npm i helmet
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();
// add your server code starting here

// Add Middleware
server.use(express.json());
server.use(helmet());

// POST Request - Create
server.post('/api/posts', (req, res) => {
    const userInformation = req.body;
    console.log('user Information', userInformation)

    db
        .insert(userInformation)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            if (err.errno === 19) {
                res.status(400).json({ msg: 'Please provide title and contents for the post.'});
            } else {
                res.status(500).json({ error: 'There was an error while saving the post to the database' });
            }
        });
});

// GET Request - Read
server.get('/', (req, res) => {
    res.send('This is 8K');
});

// GET Request to /api/posts
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'The posts information could not be retrived.' });
        });
});

// GET Request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
        .findById(id)
        .then(posts => {
            if (posts.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            } else {
                res.json(posts[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        });
});

// PUT Request - Update
server.put('/api/posts/:id', function(req, res) {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.findById(id).then(posts => {
                    res.status(200).json(posts[0]);
                });
            } else {
                res.status(404).json({ msg: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            if (err.errno === 19) {
                res.status(400).json({ msg: 'Please provide title and contents for the post.' });
            } else {
                res.status(500).json({ error: 'The post information could not be modified.' });
            }
        });
});


server.listen(8000, () => console.log('\n== API Running on port 8000 ==\n'));