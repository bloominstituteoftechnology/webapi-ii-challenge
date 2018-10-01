// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());

server.get('/api/posts', (request, response) => {
    db.find()
        .then(posts => response.json(posts))
        .catch(error => response.send(error));
        console.log(`Posts: ${posts}`)
});

const port = 8000;
server.listen(port, () => 
    console.log(`Server is listening to Port ${port}`)
)