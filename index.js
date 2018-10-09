// import express from 'express'; // ES2015 module > export default

const express = require('express'); //  commonJS modulex > module,exports = somwCode

const db = require('./data/db.js');

const server = express();   

server.get('/', (req, res) => {
    res.send('<h1>Wonjae Hwang</h1>')
})

server.get('/api/users', (req, res) => { // request handler, route handler, listener... names
    db.find()
        .then(users => {
        console.log('\n** users **', users)
        res.json(users);
        })
        .catch(err => res.send(err))
})

// watch for traffic in particular port
// http://localhost:3000 > 3000 is the port, a place where we can test and run traffic apps
 const port = 9000;
 server.listen(port, () => console.log(` === API running on port ${port} === `))

// import your node modules

// add your server code starting here
