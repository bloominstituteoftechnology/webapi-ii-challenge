// import your node modules
const bodyParser = require('body-parser');
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

//Function to get new ID
let nextId = 10;

function getNewId() {
    return nextId++;
}

// add your server code starting here
//GET
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({error:"The posts information could not be retrieved."});
    });
})

server.get('/api/posts/:id', (req,res) => {
    const id = req.params.id

    db.findById(id).then(posts => {
        if(posts.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.json(posts[0]);
        }
    }) .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

//POST
server.post('/api/posts', (req, res) => {
    const post = { id: getNewId(), ...req.body};
    posts = [...posts, post];
    db.find().then(posts => {
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        res.status(201).json(posts);
    }
    }) .catch(err => {
        res.status(500).json({ error:"There was an error while saving the post to the database" })
    })
});


server.listen(8000, () => console.log('\n== API Running on port 8000 ==\n'));