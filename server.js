// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const port = 5555;
const server = express();
server.use(express.json());


const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

server.get('/api/posts',
(req, res) => {
    db 
    .find()
    .then(posts => {
        res.json({ posts });
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(post => {
        if (post.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(post); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));