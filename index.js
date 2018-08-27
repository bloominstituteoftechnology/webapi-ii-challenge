const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/posts', (req,res) => {
    res.send("Hello FSW12")
})

server.get('/posts', (req,res) =>{
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch( error => {
        console.log.error('error', error);

        res.status(500).json({message: 'Error getting the data'})
    })
})


server.listen(9000, () => console.log('\n==API on port 9k ==\n'))

// const express = require('express');
// const db = require('./data/db.js')
// const server = express();

// server.use(express.json());

// server.get('/', (req, res) => {
//     res.send("Hello FSW12")
// });

// server.get('/users', (req, res) => {
//     db.find().then( users => {
//         res.status(200).json(users);
//     }).catch(err => {
//         console.log.error('error', err);

//         res.status(500).json({message: 'Error getting the data'})
//     });
// })

// server.listen(9000, () => console.log('\n==API on port 9k ==\n'));