// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('This is working')
});

server.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log('error', err);

            res.status(500).json({ error: 'The posts information could not be retrieved.' })
        })
})


server.listen(8000, () => console.log('\n== API on port 8k==\n'))
