const express = require('express'); // CommonJS

const db = require('./data/db.js');

const server = express();

//configure middleware for the server
server.use(express.json());

//configure routing (routing is also a form of middleware)
server.get('/', (req, res) => {
    res.send('hello cs12');
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ message: 'Error getting the data'})
    })
})

//start the server
server.listen(9000, () => console.log('\n== API on port 9K ==\n'))