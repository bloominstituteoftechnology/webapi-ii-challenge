// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: `http://localhost:3000`}));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// add your server code starting here
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, 'Please provide title and content for the post.', res);
        return;
    }
    db.insert({ title, contents })
        .then(response => {
            res.status(201).json( response );
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "There was an error while saving the post to the database.", res);
            return;
        })
});

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
            sendUserError(500, "The post information could not be retrieved.", res);
            return;
        })
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(num => {
            if (num === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.json({ num })
        })
        .catch(err => {
            sendUserError(500, "The post could not be removed.", res);
            return;
        })
});

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    const { id } = req.params;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db.update(id, { title, content })
        .then(num => {
            if (num === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.status(200).json({ num });
        })
        .catch(err => {
            sendUserError(500, "The post information could not be modified.", res);
            return;
        })
});

server.listen(port, () => console.log(`Server running on port ${port}`));