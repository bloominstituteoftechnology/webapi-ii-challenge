// Import Express
const express = require('express');

// Import db
const db = require('./data/db.js');

// Initialize Express
const server = express();

// Middleware
server.use(express.json());

// Run Server
server.listen(3000, () => {
    console.log('server running');
});
