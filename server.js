// Import your node modules

const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    console.log(req.headers);
    const { path } = req;
    const timeStamp = Date.now();
    const log = { path, ua, timeStamp };
    const stringLog = JSON.stringify(log);
    console.log(stringLog);
    next();
};

server.use(customLogger);

// Add your server code starting here

server.get('/', (req, res) => {
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
            sendUserError(400, error, res);
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

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(posts => {
            if (posts.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(posts);
        })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json({ success: 'User with ID: ${id} was removed from the system.', res })
        })
        .catch(error => {
            sendUserError(500, 'The post could not be removed.', res);
            return;
        }); 
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, `Please provide the title and contents for this post.`, res);
        return;
    }
    db 
        .update( id, {title, contents} )
        .then(response => {
            if (response == 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            db
                .findById(id)
                .then(posts => {
                    if (posts.length === 0) {
                        sendUserError(404, 'The post with the specified ID does not exist.', res)
                        return;
                    }
                    res.json(user);
                })
                .catch(error => {
                    sendUserError(500, 'The post information could not be modified.', res);
                });
            })
            .catch(error => {
                sendUserError(500, 'Something bad happened to the server.', res);
                return;
            });
        });

server.listen(port, () => console.log(`Server running on port ${port}`));