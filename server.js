// import your node modules
const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');

// add your server code starting here
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;


server.get('/api/posts', (req, res) => {
    console.log(res.status)
    db.find()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.post(`/api/posts/`, (req, res) => {
    const { id, title, contents, created_at, updated_at } = req.body;
    console.log("Testing POST", req.body);
    db
    .insert(req.body)
    .then( response => {
        res.status(201).json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
});

server.put(`/api/posts/:id`, (req, res) => {
    const { title, posts } = req.body;
    db
    .update(req.params.id, req.body)
    .then(response =>{
        res.status(201).json(response)
    })
    .catch(error =>{
        res.json({ error })
    })
})

server.delete(`/api/posts/:id`, (req, res) => {
    db.remove(req.params.id)
        .then(()=>{
            res.status(201).json({message: "We deleted it"})
        })
        .catch( error => {
            res.json({ error })
        })
})
server.listen(port, ()=>{ console.log(`Server lsiting on port ${port}`)})