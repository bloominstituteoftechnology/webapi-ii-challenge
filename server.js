// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Api Running');
});

server.get('/api/posts', (req, res) => {
  
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be retrieved' });
        });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
        .findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            } else {
                res.json(post);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be retrieved' });
        });

});

server.post('/api/posts', (req, res) => {
    const userPost = req.body;
    console.log('user post', userPost);

    db
        .insert(userPost)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            if (err.error === 19) {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
            } else {
                res.status(500).json({ errorMessage: 'There was an error while saving the post to the database' });
            }
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                res.status(200).json(users[0]);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }
        })
        .catch(err => {
            if (err.error === 19) {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
            } else {
                res.status(500).json({ error: 'The post information could not be modified' });
            }
        });
});

server.delete('/api/posts/:id', function (req, res) {
    const { id } = req.params;
   // let user;

    db
        .remove(id)
        .then(response => {
            if(response !== 1 ) {
                res.status(404).json({message: 'The post with this specified id does not exist'});
            } else {
                res.status(200).json({ message: 'Post was removed!'});
            }
           
        })

        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
