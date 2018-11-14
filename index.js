// import your node modules
const express = require('express');
const db = require('./data/db.js');
// add your server code starting here

const port = 8888;
const server = express();
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "The posts information could not be retrieved.", res);
            return;
        })
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.json({ user })
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "The post information could not be retrieved.", res);
            return;
        })
});

server.listen(port, () => console.log(`Server running on port ${port}`));

