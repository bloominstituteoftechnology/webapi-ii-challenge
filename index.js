const express = require('express');

const db =('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.send('Api up and running'));

server.listen(4000, () => console.log('Api running on port 5000'))