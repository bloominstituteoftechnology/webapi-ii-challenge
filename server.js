const express = require('express');
const db = require('./data/db')

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
   
    res.send('Hello from ExP');
});



//Error Template
const sendErr = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}



server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendErr(400, "Please provide title and contents for the post.", res);
        return;
    };

    db.insert({ title, contents })
        .then(response => {
            db.findById(response.id)
                .then(post => {
                    res.status(201).json({ post });
                })
        })
        .catch(error => {
            sendErr(500, "There was an error while saving the post to the database.", res);
            return;
        });
    
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendErr(500, "The posts information could not be retrieved.", res);
            return;
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; // pull id off of req.params;
    db.findById(id) // invoke proper db.method(id) passing it the id.
        .then(post => { // handle the promise like
            if (post == 0) {
                sendErr(404, "The post with the specified ID does not exist.", res);
                return;
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            sendError(500, "The post information could not be retrieved.", res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if (post == 0) {
                sendErr(404, "The post with the specified ID does not exist.", res);
                return;
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            sendErr(500, "The post could not be removed.", res);
        });
});

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendErr(400, "Please provide title and contents for the post.", res);
        return;
    }
    db.update(id, { title, contents })
        .then(post => {
            if (post == 0) {
                sendErr(404, "The post with the specified ID does not exist.", res);
                return;
            };
            db.findById(id)
                .then(post => {
                    if (post.length === 0) {
                        sendErr(404, 'Post with that id not found.', res);
                        return;
                    }
                    res.json({ post });
                })
        })
        .catch(error => {
            sendErr(500, "The post information could not be modified.", res);
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
