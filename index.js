// import your node modules
const express = require('express');
const db = require('./data/db.js');
// add your server code starting here

const port = 8888;  // nodemon index.js
const server = express();
server.use(express.json());


//MIDDLEWARE (custom) for error handling
const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

//MIDDLEWARE (custom) for returning response object data
const getbackPost = (id, res) => {
    db.findById(id)
    .then(user => {
        res.json({ user })
    })
}

//GET
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

//GET By ID
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

//POST

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, 'Please provide title and content for the post.', res);
        return;
    }
    db.insert({ title, contents })
        .then(response => {
            console.log(returnPost(response.id, res))
            getbackPost(response.id, res);
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "There was an error while saving the post to the database.", res);
            return;
        })
});

//DELETE

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
            console.log(err);
            sendUserError(500, "The post could not be removed.", res);
            return;
        })
});

//PUT

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    const { id } = req.params;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db.update(id, { title, contents })
        .then(num => {
            if (num === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.status(200).json({ num });
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "The post information could not be modified.", res);
            return;
        })
});

server.listen(port, () => console.log(`Server running on port ${port}`));

