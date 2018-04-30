// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    res.send('Apr running');
});

//post
server.post('/api/posts', function(req, res) {
    const { title, contents } = req.body
    const post = {title: title, contents: contents};
    db.insert(post).then().catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })

});
//get all
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});
//get by id
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});
//delete
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(post => {
        res.json("deleted");
    }).catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    })

});
//put
server.put('/api/posts/:id', (req, res) => {

});

server.listen(666, () => console.log('\n==API Running on port 666\n'));