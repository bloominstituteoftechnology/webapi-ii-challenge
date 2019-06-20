const server = require('./api/server.js');

server.listen(9090, () => {
    console.log('\n*** Server Running on http://localhost:9090 ***\n')
})