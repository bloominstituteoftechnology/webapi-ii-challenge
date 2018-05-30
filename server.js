// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// add your server code starting here

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => {
        sendUserError(500, "The posts information could not be retrieved.", res)
    })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents){
        sendUserError(400, "Please provide title and contents for the post.", res);
    }
    db
        .insert({ title, contents })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            sendUserError(500, "There was an error while saving the post to the database", res);
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if(post.length === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.json(post);
        })
        .catch(err => {
            sendUserError(500, "The post information could not be retrieved.", res);
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db  
        .remove(id)
        .then(post => {
            console.log(post);
            if(post === 0){
                sendUserError(404, "The post with the specified ID does not exist.", res);
            } else{
                res.json({ success: `User with id ${id} has been removed from system`});
            }
        })
        .catch(err => {
            sendUserError(500, "The post could not be removed", res)
        })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));