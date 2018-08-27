// import your node modules
const express = require('express'); 
const db = require('./data/db.js');
const server = express(); 

server.use(express.json()); 

// add your server code starting here
server.get('/', (req, res)=>{
    res.send("Hello World");
});

server.get('/posts', (req, res)=>{
    db.find()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err =>{
        console.log('error', err); 

        res.status(500).json({ message:'Error Getting Data' })
    })
}); 
server.get('/posts/:id', (req, res)=>{
    const id = req.params.id
    db
    .findById(id)
    .then( posts =>{
        res.status(200).json(posts);
    }).catch(err=>{
        console.log('error', err);
        res.status(404).json({message: "The posts with the specified ID does not exist."})
    })
})

server.listen(8000, ()=> console.log(`/n== API on port 8k ==/n`)); 