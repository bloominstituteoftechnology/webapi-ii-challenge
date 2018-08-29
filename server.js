// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
// const bodyParser = require('body-parser');

// add your server code starting here

// server.use(bodyParser.json());
server.use(express.json());
server.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

server.get('/', (req, res) => {
    res.send('Welcome to your training day user');
} );

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    })
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(post);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        return;
    }
    db.insert({
        title,
        contents,
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the post to the database' });
        return;
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const expost = db.findById(id).then(post => { if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        return;
        }
        res.json(post) });
    db.remove(id)
        .then(count => {
            if (count) {
                res.status(204).json(expost).end();
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(err => res.status(500).json({ error: 'The post could not be removed' }));
});

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        return;
    }
    db.update(req.params.id, req.body)
        .then(posty => {
            if (posty) {
                res.status(200).json(req.body)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
            
        })
        .catch(err => res.status(500).json({ message: 'The post information could not be modified.' }));
});

server.listen(5000, () => console.log('/n== API on port 5k==/n') );