// import your node modules

const db = require('./data/db.js');
const cors = require('cors');
const express = require('express');
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' })); //for a Create React App
server.get('/', (req, res) => {
    res.send('hello from express');
})
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db 
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The posts information could not be retrieved." })
    })
})
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
if(req.params.id == undefined) {
    res.status(404)
    res.json({ message: "The post with the specified ID does not exist." })
}
else {
    db
    .findById(id)
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The post information could not be retrieved." })
    })
}})
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
if(title == undefined || contents == undefined) {
    res.status(404)
    res.json({ message: "Please provide title and contents for the post." })
}
else {
    db
    .insert({ title, contents }) 
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "There was an error while saving the post to the database" })
    })
}})
server.put('/api/posts/:id', (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
        db
        .update(req.params.id, req.body)
        .then(posts => {
            if (posts === 0) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." })
            } 
            else {
                res.json({ posts })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The post information could not be modified."});
        })
    })
    server.delete('/api/posts/:id', (req, res) => {
        const { id } = req.params;
            db
            .remove(id)
            .then(posts => {
                if (id === undefined) {
                    res.status(404);
                    res.json({ message: "The post with the specified ID does not exist." })
                } 
                else {
                    res.status(200);
                    res.json({ posts })
                }
            })
            .catch(error => {
                res.status(500)
                res.json({ error: "The post could not be removed." })
            })
        })


server.listen(port, () => console.log(`Server running on port ${port}`)); //have to have this so your server can listen to the code above!
