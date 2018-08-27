const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Fernando');
});

server.get('/db', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ message: 'Error setting the data' });
        });
})

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));