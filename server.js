// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send("Hello FSW12 Express Node.js backend")
})

server.get('/posts', (req,res) =>{
    db.find().then().catch()
})
// server.get('/users', (req, res) => {
//     db.find().then( users => {
//         res.status(200).json(users);
//     }).catch(err => {
//         console.log.error('error', err);

//         res.status(500).json({message: 'Error getting the data'})
//     });
// })


server.listen(9000, () => console.log('\n==API on port 9000 ==\n'))

// add your server code starting here
