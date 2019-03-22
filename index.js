const express = require('express');

const postsRoutes = require('./postsRoutes/postsRoutes');

const server = express();
const parser = express.json();
const PORT = 3000;

server.use(parser);
server.use('/api/posts', postsRoutes);

server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})