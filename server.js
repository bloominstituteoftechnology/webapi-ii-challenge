// import your node modules

const express = require('express')
const server = express()
const bodyParser = require('body-parser');
const db = require('./data/db.js');
server.use(express.json());

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err =>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(posts => {
        if (posts.length == 0)
        res.status(404).json({ message: 'The post with the specified ID does not exist'});
        res.json(posts);
    })
    .catch(err =>{
        res.status(500).json({ error:'The post information could not be retrieved.' })
    })
})

server.get('/', (req,res) => {
    res.send('API RUNNING');
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db
    .findById(id)
    .then(foundPost => {
        post = { ...foundPost[0] };
        db
    .remove(id)
    .then(response => {
    res.status(404).json({ message: 'The post with the specified ID does not exist'});
    });
})
    .catch(err =>{
        res.status(500).json({ error:'The post could not be removed.' })
    })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    db
    .update(id, update)
    .then(posts => {
        if (posts.length == 0) {
        db.findById(id).then(posts => {
            res.status(200).json(posts[0]);
        })
       } else {
            res.status(404).json({ error: 'The post with the specified ID does not exist.'})
        }
        })
       .catch (err => {
           if (err.errno === 19) {
           res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
           } else {
               res.status(500).json({ error: 'The post information could not be modified.'})
           }
       })
})

server.post('/api/posts', (req,res) => {
    const postData = req.body;
    console.log('post data', postData)
    db
    .insert(postData)
    .then(response => {
    res.status(201).json(response)
    })
    .catch(err =>{
        if (err.errno === 19){
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
        } else {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    })
})

server.listen(5000, () => console.log('\n== API RUNNING ON PORT 5000==\n'));