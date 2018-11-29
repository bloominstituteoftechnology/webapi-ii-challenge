// import your node modules

const express = require('express');
const db = require('./data/db.js');

const server = express();     //express is a function
const PORT = 5000;

// CORS stuff
const cors = require('cors')
server.use(cors())

// server.get('/api/posts/:id', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// server.listen(80, function () {
//     console.log('CORS-enabled web server listening on port 80')
// })

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts);      //implicit status(200)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "The posts information could not be retrieved."})
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then((post) => {
        if(post){
            res.json(post);
        } else {
            res 
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "The post information could not be retrieved."});
    })
});


// listening

server.listen(PORT, () => {
    console.log(`server on localhost:5000 is up and running on port ${PORT}`)
})