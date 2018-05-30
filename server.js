// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');
// add your server code starting here
const port = 5005;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3333' }));

const sendError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = {path, ua, timeStamp};
    const stringLog = JSON.stringify(log);
    console.log(stringLog);
    next();
};

server.use(customLogger);

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send('Hello from express');
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendError(400, "Please provide title and contents for the post.", res);
    };
    db.insert({ title, contents })
        .then(response => {
            res.status(201).send(response);
        })
        .catch(error => {
            sendError(500, "Something went wrong.", res);
        });
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendError(500, "The posts information could not be retrieved.", res);
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; // pull id off of req.params;
    db.findById(id) // invoke proper db.method(id) passing it the id.
        .then(post => { // handle the promise like
            if (post == 0) {
                sendError(404, "The post with the specified ID does not exist.", res);
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            sendError(500, "Could not access posts data", res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if (post == 0) {
                sendError(404, "The post with the specified ID does not exist.", res);
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            sendError(500, "The post could not be removed", res);
        });
});

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendError(400, "Please provide title and contents for the post.", res);
    }
    db.update(id, { title, contents })
        .then(post => {
            if (post == 0) {
                sendError(404, "The post with the specified ID does not exist.", res);
            };
            db.findById(id)
                .then(post => {
                    if (post.length === 0) {
                        sendError(404, 'post with that id not found', res);
                    }
                    res.json({ post });
                })
        })
        .catch(error => {
            sendError(500, "The post information could not be modified.", res);
        });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));