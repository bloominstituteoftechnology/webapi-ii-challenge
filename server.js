// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));

server.post('/api/users', (req, res) => {
    const ob = req.body;
    
    db
        .insert(ob)
        .then(response => {
            if (typeof req.body.title !== 'undefined' && typeof req.body.contents !== 'undefined') {
                res.status(400).json({ message: 'Please provide title and contents for the post.'})
            }
         else {
            res.status(201).json({ messege: 'Post Successful.' })
        }})
        .catch(err => {
            res.status(500).json({ message: 'here was an error while saving the post to the database'})
        })

})

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve post information'});
    })
})