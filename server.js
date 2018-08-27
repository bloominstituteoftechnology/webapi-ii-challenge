// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/', (req, res)=>{
    res.send('YOYOYO');
});

server.get('/api/posts', (req,res)=>{
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch( err => console.error('error', err));
})

server.get('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    db.findById(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.error('error', err));
});

const yoyo = {
    title: 'I dunno',
    content: 'Some content'
};

server.post('/api/posts/', (req, res) => {
    db.insert(post)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.error('error', err));
});

server.delete('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    db.remove(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.error('error', err));
})


server.listen(9000, ()=> console.log('GotIT'));