// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server= express();

// add your server code starting here
server.use(express.json());

server.listen(8000, ()=> {
    console.log('Server up on port:8000')
});

server.get('/', (req, res) => {
    res.send('Node-Express-Lab');
});

server.get('/posts', (req,res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(() =>{
        res.status(500).json({error:'Cannot get Posts'})
    })
})

server.get('/posts/:id', (req,res)=> {
    const {id}= req.params
    db.findById(id)
    .then(response =>{
        if(response.length<1) {
            res.status(404).json({message:'Post with specified Id does not exist'})
        } else {
            res.json(response)
        }
    })
    .catch(() => {
        res.status(500).json({error:'Post info could not be retrieved'})
    })
});

server.post('/posts', (req, res) => {
    const { title, contents }= req.body;
    if(!title||!contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        return;
    }
    db.insert({title, contents})
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database"})
        return;
    });
});
