// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
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

// /api/users/id123

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

  
server.listen(8000, () => console.log('\n== API Running on port 5000 ==\n'));
