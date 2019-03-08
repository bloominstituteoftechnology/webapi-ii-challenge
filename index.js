// Import Express
const express = require('express');

// Import Posts Routes
const postsRoutes = require('./postsRoutes');

// Initialize Express
const server = express();

// Middleware
server.use(express.json());


server.use('/api/posts', postsRoutes);


// Run Server
server.listen(3000, () => {
    console.log('server running');
});
