// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function(req, res) {
    res.send({ api: 'Running...' });
});

// server.post('/api/posts', function(req, res) {
//     db
//     .insert()
//     .then(posts => {
//         res.json(posts);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

//new post
server.post('/api/posts', function(req, res) {
    const post = req.body;
    db
    .insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide title and content for the post" });
    });
});

server.get('/api/posts', function(req, res) {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.send(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;
        
    db
    .findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.send(404).send({ message: 'The post with the specified ID does not exist.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db
    .findById(id)
    .then(response => {
        post = { ...response[0] };
    db
    .remove(id)
    .then(response => {
        res.status(200).json(post);
    })
    .catch(errorMessage => {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
    });
})
.catch(error => {
    res.status(500).json({ error: "The post could not be removed" });
})
});


//     const { id } = req.params;

//     db
//     .remove(id)
//     .then(posts => {
//         res.json(posts[0]);
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'The post could not be removed' });
//     });
// });

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
    .update(id, update)
    .then(count => {
        if (count > 0) {
            db
            .findById(id)
            .then(updatedPosts => {
                res.status(200).json(updatedPosts[0]);
            })
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        }        
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." });
    });
});


//     const { id } = req.params;

//     db
//     .update(id)
//     .then(posts => {
//         res.json(posts[0]);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });




const port = 5500;
server.listen(port, () => console.log('API Running on port 5500'));