// Import your node modules

const express = require('express');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

// Add your server code starting here

server.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(`'Greetings, human!' -- Express`);
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, `Please provide the title and contents for this post.`, res);
        return;
    }
    db
        .insert({
            title,
            contents
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            sendUserError(500, error, res);
            return;
        });
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendUserError(500, `The posts information could not be retrieved.`, res);
            return;
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));