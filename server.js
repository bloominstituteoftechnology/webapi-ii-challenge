// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here
server.use(express.json());

server.get('/', (req, res) => {
    res.send('We are in the root!');
})

server.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.error('error', error);

            res.status(500).json({
                message: 'Error retrieving the data'
            })
        })
})


server.listen(5000, () => console.log('\n==listening API at port 5000 ==\n'));