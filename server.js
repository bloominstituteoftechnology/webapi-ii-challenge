// import your node modules

//required imports

const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

//GET POSTS
server.get('/', async (req, res)=> {
try {
    const posts = await db.find()
    res.status(200).json(posts);
} catch (err) {
    res.status(500).send('error', err);
}

});

server.listen(8000, () => console.log('API running on port 8000'));