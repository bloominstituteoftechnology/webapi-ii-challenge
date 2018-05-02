// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

//add middleware
server.use(express.json());

// add your server code starting here
server.post('/api/posts', (request, response) => {
    const id = request.params.id;
    let title = '';
    let contents = '';
    let post = { title, contents };

    db
        .insert(post)
        .then(post => {
            response.status(201);
            response.json(post);
        })
        .catch(err => {
            response.status(500);
            response.json({ error: 'There was an error while saving the post to the database' });
        });
        if (!title || !contents) {
            response.status(400);
            response.json({ message: 'Please provide title and contents. '})
        }
});

server.get('/', (req, res) => {
    res.send('API IS LITTY CITY!');
  });

server.get('/api/posts', (req, res) => {
    //get all the users
    db
        .find()
        .then(users => {
            res.json(users);
        })  
        .catch(err => {
            res.status(500).json({ error: 'The posts information could not be retrieved.' });
        });
});

server.get('/api/posts/:id', (req, res) => {
    //grab the id from URL parameters
    const id = req.params.id;

    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }   else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could be not be retrieved' });
        });
})

server. delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db
        .remove(id)
        .then(post => {
            response.json(post)
        })
        .catch(error => {
            response.status(500);
            response.json({ error: 'The post could not be removed.' })
        })
        if (!id) {
            response.status(404);
            response.json({ message: 'The post with specified ID does not exist' })
        }
});

server.put('/api/posts/:id', function(req, res) {
    const { id } = req.params;
    const update = req.body;

    if (!update.title || !update.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.update(id, update)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Updated' })
        } else {
            res.status(404).json({ message: 'Post could not be found'});
        }
    })
    .catch(err => {
        res.status(500).json(error)
    })
})

server.listen(8000, () => console.log('\n== API Running on port 5000 ==\n'));
