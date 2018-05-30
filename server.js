// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');
const port = 5555;
const server = express();

server.use(cors());
server.use(express.json());
// add your server code starting here
const error = (res, statusCode, errMessage) => {
    res.status(statusCode).json({error: errMessage});
}

/*
*****server requests below*****
*/

//POST
server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }
    db.insert({title, contents})
    .then(response => {
        res.status(201).send(response);
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
});


//GET
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(data => res.json(data))
    .catch(err => error[res, 500, "The posts information could not be retrieved."]);
});

server.get('/api/posts/:id', (req, res) => {
    db
    .findById(req.params.id)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(response);
        }
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be modified."});
    })
})

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    db
    .remove(req.params.id)
    .then(response => {
        if(response === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }else {
            res.status(200).json(response);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    })
});

//PUT
server.put('/api/posts/:id', (req, res) => {
    const {title, contents} = req.body
    const {id} = req.params
    const post = {title, contents}
    db
    .update(id, post)
    .then(response => {
        console.log(id, post);
        res.json(response);
    })
    .catch(message => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    });
})

server.listen(port, () => console.log(`Server running on port ${port}`));