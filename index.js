// import your node modules
const express = require('express');

const db = require('./data/db');

// add your server code starting here
const server = express();

const PORT = 5000;

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
            console.log(`posts ${posts}`);
            res.status(200).send(posts) 
    })
    .catch(err => {
        res.status(500).send(`<h1>Bad Request<h1>`);
        //res.status(500).json({message: `failed to get users`});
    });
});
    

server.get('/api/posts/:id', (req, res) => {
    // console.log(req);
    console.log(req.params);
    const id = req.params.id;

    db.findById(id)
        .then( posts => {
            console.log(`posts = ${posts.id}`);
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: `User does not exist.`});
        });
    
});



server.listen(PORT, () => {
    console.log(`The server is runnning on port ${PORT}`);
});
//rggpfgw

