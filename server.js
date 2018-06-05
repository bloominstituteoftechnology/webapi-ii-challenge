// import your node modules
const express = require('express')
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('API running');
});

// GET request to /api/posts
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
    })
// If retrieval error from database
.catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

/*
// GET request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    // grab the id from URL params
    const id = req.params.id;
    db
        .findbyID(id)
        .then(posts => {
            if (posts.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        } else {
            res.json(posts[0]);
        }
    })
})
// If retrieval error from database
.catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });

*/

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));