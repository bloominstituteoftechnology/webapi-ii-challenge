// import your node modules
const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here
//GET	/api/posts
//returns an array of all the post objects contained in the database.
server.get('/api/posts', (request, response) => {
     db.find()
       .then(posts => {
           response.status(200).json(posts);
        })
       .catch(error => {
            response.status(500).jason({error : 'The post could not be retrieved'})
        })
})

server.listen(9000, () => console.log('server is live'));
