const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));



server.listen(port, () => console.log(`Server running on port ${port}`));
