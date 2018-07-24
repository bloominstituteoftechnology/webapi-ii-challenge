// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db');

// creates an express application using the express module
const port = 8000;
const server = express();
server.use(express.json());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World <br><h1>this is Node Express Lab</h1>');
});


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            error: "post: Please provide title and content for the post."
        });
        return;
    };
    db.insert({ title, contents })
        .then(response => {
            res.status(201).send(response);
        })
    .catch(error => {
        res.json({ error: "insert: Please provide title and content for the post." });
    });
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error: "The posts information could not be retrieved." });
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; // pull id off of req.params;
    db.findById(id) // invoke proper db.method(id) passing it the id.
        .then(post => { // handle the promise like
            if (post === 0) {
                res.status(404).json({
                    error: "findById: The post with the specified ID does not exist."
                })
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            res.json({ error: "The post with the specified ID does not exist." });
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if (post === 0) {
                res.status(404).json({
                    error: "remove: The post with the specified ID does not exist."
                })
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "delete: The post could not be removed"
            });
        });
});

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if ( !title || !contents ) {
        res.status(400).json({
            error: "update: Please provide title and content for the post."
        });
        return;
    }
    db.update(id, { title, contents })
        .then(post => {
            if (post === 0) {
                res.status(404).json({
                    error: "The post with the specified ID does not exist."
                })
                return;
            } else {
                res.json({ post });
            }
        })
        .catch(error => {
            res.status(500).send({ error: "update: The post information could not be modified." });
        });
});
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts

//server.listen(8000, () => console.log('API running on port 8000'));
server.listen(port, () => console.log(`Server is running on port ${port}`));