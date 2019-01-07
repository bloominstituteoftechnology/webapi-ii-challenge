// import your node modules
const express = require('express')

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4545;

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
            console.log(`posts ${posts}`);
            res.status(200).send(posts);
        
    })
    .catch(err =>{
        res.status(500).send(`<h1>Bad Request<h1>`);
    })
});
    

// server.get()
//     .then()
//     .catch();



server.listen(PORT, () => {
    console.log(`The server is runnning on port ${PORT}`);
});