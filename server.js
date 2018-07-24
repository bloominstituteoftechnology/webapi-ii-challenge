// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/users', (req, res) =>{
    db.find().then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error in retrieving the information'});
    })
});


server.listen(8000, () => console.log('API running on port 8000'));