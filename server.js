// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

server.get('/', (req, res) => {
    res.send('Yes its working');
})

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            sendUserError(500, 'The posts information could not be retrieved.', res)
            return;
        });
});



//server.post()
//server.delete()
//server.put()

server.listen(5555);
console.log('listening on port 5555');