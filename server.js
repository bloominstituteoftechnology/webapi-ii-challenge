// import your node modules
const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors({ origin: 'http://localhost:5000/'}))
const port = 5000;

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};


server.get('/api/posts', (req, res) => {
    console.log(res.status)
    db.find()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            sendUserError(400, 'the users information could not be retrieneved', res);
            return;
        })
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.post(`/api/posts/`, (req, res) => {
    const { id, title, contents, created_at, updated_at } = req.body;
    console.log("Testing POST", req.body);
    db
    .insert(req.body)
    .then( response => {
        res.status(201).json({ response })
    })
    .catch(error => {
        sendUserError(400, error, res);
        return;
    });
});

server.put(`/api/posts/:id`, (req, res) => {
    const { title, posts } = req.body;
    const { id } = req.params;
    db
    .update(id, req.body)
    .then(response =>{
        res.status(201).json(response)
    })
    .catch(error =>{
        res.json({ error })
    })
})

server.delete(`/api/posts/:id`, (req, res) => {
    db.remove(req.params.id)
        .then(()=>{
            console.log(response);
            if(response === 0){
                sendUserError(404, 'the user with that iddoes not exist', res)
            }
            res.status(201).json({message: "We deleted it"})
        })
        .catch( error => {
             console.log(error);
            sendUserError(404, 'the user could not be removed', res)
            res.json({ error })
        })
})
server.listen(port, ()=>{ console.log(`Server lsiting on port ${port}`)})