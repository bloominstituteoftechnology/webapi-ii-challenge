// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.use(express.json());

server.get('/api/posts', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json(users);
    }
    catch (err)  {
        res.status(500).json({ error: 'The posts information could not be retreived'});
        res.end();
    }
})


server.listen(8001);