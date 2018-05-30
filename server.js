// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

// add your server code starting here

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));