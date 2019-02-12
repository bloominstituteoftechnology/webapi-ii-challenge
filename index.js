const server = require('./server.js');

server.listen(4000, () => {
    console.log('Serving running on http://localhost:4000');
})