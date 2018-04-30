// import your node modules
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./data/db.js');
const morgan = require('morgan');
const helmet = require('helmet');

// add your server code starting here
const port = 3000;

const server =  express();
server.use(bodyParser.json())
server.use(morgan('dev'));
server.use(helmet());

server.get('/', (req, res) => {
    res.send({api: 'RUN TO THE SETTING SUN'});
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then( users => res.json(users))
    .catch(error => res.status(500).json({ error: "Info not retrieved"}));
})

server.get('api/posts/:id', function(req, res) {
    const { id } = req.params;
})
