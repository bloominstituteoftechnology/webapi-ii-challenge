// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here

const server = express();

server.use(cors());
server.use(express.json());


server.get('/api/posts', (req, res) => {   // Could also abstract away this function to another file and import it here as -- const greeter = require('./greeter.js')
db.find()
.then(users => res.status(200).json(users))
.catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

server.get('/api/posts/:id', (req, res) => {   // Could also abstract away this function to another file and import it here as -- const greeter = require('./greeter.js')
const { id } = req.params;
db.findById(id)
.then(user => {
    if(user){
        res.status(200).json(user)}
    else {
        res.status(400).json({ message: "The post with the specified ID does not exist." })
    }})
.catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

server.listen(9000, () => console.log(`Server running on Port 9000`))


