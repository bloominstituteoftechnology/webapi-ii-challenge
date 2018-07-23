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

server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({error: 'The posts information could not be retrieved.'});
        });
});

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if(user[0]) {
                res.status(200).json(user);
            } else {
                res.status(404).json({error: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(error => {
            res.status(500).json({error: 'The post information could not be retrieved.'});
        });
});

server.listen(8000, () => console.log('Server running...'));
