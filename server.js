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
            res.status(201).json({ message: 'Post Successful.' })
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
        process.abort();

    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved.'});
        process.abort();
    });
});


server.delete('/api/posts/:id', (req, res) => {
    const id = req.param.id;
    db
        .remove(id)
        .then(post => {
            if (id === 'undefined') {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            } else {
                res.status(200);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post could not be removed.' });
            process.abort();
        })
})



