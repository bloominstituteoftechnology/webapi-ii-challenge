const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors());
//end point ^^

//create err msg and pass its variable to each CRUD.  It needed HTTP status, err msg and res as parameters.
const errorAlert = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}

// start server CRUD 

//res.send is for testing to see if the server connect to the browser.  If connected, should see "Hello from Server Port 5000"
server.get('/', (req, res) => {
    res.send('Hello from Server Port 5000');
});


server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            errorAlert(500, 'Please provide title and contents for the post.', res);
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(posts => {
            if(posts.length === 0) {
                errorAlert(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json({ posts })
        })
        .catch(error => {
            errorAlert(500, 'The post information could not be retrieved.', res);
        })
})


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        errorAlert(400, 'Please provide title and contents for the post.', res);
    }
    db
        .insert({ title, contents })
        .then(newContent => {
            res.status(201).json({ newContent });
        })
        .catch(error => {
            errorAlert(500, 'There was an error while saving the post to the database.', res);
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(posts => {
            if(posts === 0) {
                errorAlert(404, 'The post with the specified ID does not exist.', res);
            }
        })
        .catch(error => {
            errorAlert(500, 'The post could not be removed.', res);
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    const { id } = req.params;
    if(!title || !contents) {
        errorAlert(400, 'Please provide title and contents for the post.', res);
    }
    db
        .update(id, { title, contents })
        .then(count => {
            if(count == 0) {
                errorAlert(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            db
                .findById(id)
                .then(posts => {
                    if(posts.length === 0) {
                    errorAlert(404, 'The post with the specified ID does not exist.', res);
                    return;
                }
                res.json({ posts })
                })
                .catch(error => {
                    errorAlert(500, 'The post information could not be retrieved.', res);
                })
        })
        .catch(error => {
            errorAlert(500, 'The post information could not be modified.', res);
        })

})

server.listen(port, () => console.log(`Server is running on port ${port}`));