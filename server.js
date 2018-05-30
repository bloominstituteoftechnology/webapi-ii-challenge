const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();
const port = 5555;
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

const sendError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

server.post(`/api/posts`, (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db.insert({ title, contents })
        .then( response => {
            res.status(201);
            res.json(response);
        })
        .catch( error => {
            sendError(500, "There was an error while saving the post to the database", res);
        })
})

server.get(`/api/posts`, (req, res) => {
    db.find()
        .then( users => {
            res.json({ users })
        })
        .catch( error => {
            sendError(500, "The posts information could not be retrieved.", res);
        })
})

server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then( response => {
            if (response.length === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res)
                return;
            } else {
                res.json(response);
            }
        })
        .catch( error => {
            sendError(500, "The post information could not be retrieved.", res);
        })
})

server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then( response => {
            if( response === 0 ) {
                sendUserError(404, "The post with the specified ID does not exist.");
                return;
            } else {
                db.find()
                    .then( users => {
                        res.json({ users })
                    })
                    .catch( error => {
                        sendError(500, "The posts information could not be retrieved.", res);
                    })
            }
        })
        .catch( error => {
            sendError(500, "The post could not be removed", res);
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`));
