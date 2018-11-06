// import your node modules

const db = require('./data/db.js');
const express = require('express')
// add your server code starting here
const server = express();
const greeter = require('./greeter.js')

server.use(express.json()); // teach express how to parse the  JSON request body

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

server.post('/api/posts', async (req, res) => {
    console.log('body:', req.body)
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        const user = await db.findById(userId.id)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'error creating user', error})
    }
})

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id).then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json({ message: 'error no user found', err})
    })
})

server.put('api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
    .then(count => {
        if(count) {
            res.status(200).json({ message: `${count} user updated`});
        } else {
            res.status(404).json({ message: 'user not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error updating the user'})
    })
})

server.listen(9000, ()=> console.log('the server is alive!'))
