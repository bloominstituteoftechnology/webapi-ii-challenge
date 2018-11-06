// import your node modules

const db = require('./data/db.js');
const express = require('express')
// add your server code starting here
const server = express();
const greeter = require('./greeter.js')

server.get('/', (req, res) => {
    res.json('alive')
})

server.get('/greet/:person', greeter)

server.get('/api/posts', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({message: "we failed you, can't get the users"})
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(user => {
        console.log("user", user)
        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user not found'});
        }
    }).catch(err => {
        res.status(500).json({ message: "we failed you, can't get the user"})
    })

}) 

server.listen(9000, ()=> console.log('the server is alive!'))
