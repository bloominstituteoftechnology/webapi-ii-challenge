// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

server.get('/', (req, res) => {
    res.send('Yes its working');
})


const sendUserError = (status, message, res) => {
    // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
    return;
  };
  
// add your server code starting here
//GET an array of all users
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            sendUserError(500, 'The posts information could not be retrieved.', res)
            return;
        });
});

//GET a single user by id
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(user);
        })
})



//server.post()
//server.delete()
//server.put()

server.listen(5555);
console.log('listening on port 5555');