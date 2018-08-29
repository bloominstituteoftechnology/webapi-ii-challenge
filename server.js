const express = require('express');
const db = require('./data/db.js');
const server = express();
const port = 9000;
const cors = require('cors');

server.use(express.json()); //This teaches express to parse json information from req.body
server.use(cors());

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if( post.length === 0) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        else {
            res.status(200).json(post);
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', async (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        try {
            const response = await db.insert(post);
            res.status(201).json(response);
        } catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the post to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params; // the same as const id = req.params.id but destructuring the code
    db.remove(id)
        .then(count => {
            console.log('count: ', count);
            if(count) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: 'No user with this id was found.' });
            }
        })
        .catch(err => res.status(500).json(err));
});

server.put('/api/posts/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ message: "Update failed." }));
});



server.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server is listening on port ${port}`);
});