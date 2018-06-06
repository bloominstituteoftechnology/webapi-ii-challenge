// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

// add your server code starting here
/*
Battleplan:
1. Import express
2. Import cors: Cross Origin Resource Sharing
3. Implement GETS, POST, DELETE, PUT
4. create-react-app:
    1. Display list of posts
    2. Enable ability to add post
    3. Delete button that removes posts.

*/
const port = 5865;
const server = express();
server.use(express.json());
server.use(cors());

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message })
}

server.get('/', (req, res) => {
    res.send('node-express-lab')
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            userError(500, 'The posts information could not be retrieved.', res);
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(posts => {
            if (post.length === 0) {
                userError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.send(posts);
        })

        .catch(error => {
            userError(500, "The post information could not be retrieved.", res);
        });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        userError(400, 'Please provide title and contents for the post.', res)
        return;
    }
    db
        .insert({ title, contents })
        .then(response => {
            res.status(201).send(response);
        })
        .catch(error => {
            userError(500, "There was an error while saving the post to the database", res)
        })
})

server.delete('/api/posts/:id', (req, res) => {
    db
        .remove(req.params.id)
        .then(response => {
            if (response === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(response);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" });
        })
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db
        .update(id, { title, contents })
        .then(response => {
            if (response === 0) {
                userError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            db
                .findById(id)
                .then(posts => {
                    if (posts.length === 0) {
                        userError(404, "The post with the specified ID does not exist.", res);
                        return;
                    }
                    res.json(posts);
                })
                .catch(error => {
                    userError(500, "The post information could not be modified.", res);
                });
        })
        .catch(error => {
            userError(500, "The post information could not be modified.", res);
            return;
        });
});


server.listen(port, () => console.log(`Server running on port ${port}`));