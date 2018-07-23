// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS
// const helmet = require('helmet');

const server = express();
// add middleware
// server.use(helmet());

// configure routing/endpoints
server.get('/api/users', (req, res) => {
    res.send({ hello: 'world' });
});

// the get is synchronous, but the contents of the get can be a promise to be asynchronous
// first is a name (aka a path)
// the homies are the request and the response (they are homies because they always go together)

server.listen(8000, () => console.log('API running . . .'));
